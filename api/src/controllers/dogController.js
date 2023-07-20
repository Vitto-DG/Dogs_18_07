const fetch = require("node-fetch");
const { Dog, Temperament } = require("../db");

// oooooooooo Obtengo la info de la API, de la BBDD y la junto ---/

const getAPIinfo = async () => {
  const apiURL = await fetch(
    "https://api.thedogapi.com/v1/breeds?api_key=7ddc6f6e-5470-41ff-8f75-cc16b07bd6a2"
  ).then((response) => response.json());
  return apiURL;
};
const getDBInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const getAllInfo = async () => {
  let apiinfo = await getAPIinfo();
  apiinfo.map((el) => {
    el.createdByDB = false;
  });
  // adapto la INFO de la API para que coincida con de la DB y filtrar efectivamente//
  apiinfo.map((el) => {
    if (el.hasOwnProperty("temperament")) {
      let element = el.temperament;
      let Temps = element.split(",");
      let TempMaps = Temps.map((el) => {
        return { name: el };
      });
      el.temperament = TempMaps;
    }
  });
  let dbinfo = await getDBInfo();
  let totalinfo = await apiinfo.concat(dbinfo); // junto info de ambas fuentes
  return totalinfo;
};

const totalinfo = async () => {
  let allInfo = await getAllInfo();
  allInfo.forEach((el) => {
    if (el.name == "Olde English Bulldogge") {
      el.weight.metric = "22-30";
    }
    if (!el.weight.metric.includes("-")) {
      el.weight.metric = `4 - ${el.weight.metric}`;
    } 
    allInfo.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  });
  return allInfo;
};



// ooooooo Funcion POST

const post = async (name, weight, height, life_span, temperament, image) => {
  let newDog = await Dog.create({
    name: name,
    height: { metric: height },
    weight: { metric: weight },
    life_span: life_span,
    image: image,
    createdByDB: true,
  });
  let TemperamentDB = await Temperament.findAll({
    where: { name: temperament },
  });

  return await newDog.addTemperament(TemperamentDB);
};

module.exports = { getAPIinfo, getAllInfo, totalinfo, getTemp, post };