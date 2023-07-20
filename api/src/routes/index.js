const { Router, response } = require("express");
const fetch = require("node-fetch");
const { save } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog, Temperament } = require("../db");
const { totalinfo, getTemp, post } = require("../routes/Apidbinfo.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", (req, res) => {
  let promise = new Promise((resolve, reject) => {
    totalinfo().then((data) => resolve(data));
  });

  if (req.query.name) {
    const { name } = req.query;
    promise
      .then(
        (data) => data.find((el) => el.name.toLowerCase() == name.toLowerCase()) //perro encontrado
      )
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => console.log(err));
  } else {
    promise.then((data) => {
      return res.status(200).json(data);
    });
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "ddbb" : "api";
  
    try{
      const dog =
      source === "api"
      ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
      : await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"]
        }
      })
      res.status(200).json(dog)
    } catch(error){
      res.status(400).json({error: error.message})
    }
})

router.get("/dogs/:name", async (req, res) => {
  const { name } = req.params;
  let allInfo = await totalinfo();
  let DogParams = allInfo.find(
    (e) => e.name.toLowerCase() == name.toLowerCase()
  );
  DogParams
    ? res.status(200).send(DogParams)
    : res.status(404).send("NO ESTA LLEGANDO EL PERRO POR PARAMS");
});


router.post("/dog", async (req, res) => {
  const { name, weight, height, life_span, temperament } = req.body;
  let image = req.body.image;
  
  await post(name, weight, height, life_span, temperament, image);
  
  return res.status(200).json({ msg: "perro creado" });
});

router.get("/temperament", async (req, res) => {
  let getDBInfo = await Temperament.findAll();
  if (getDBInfo.length > 0) {
    res.json(getDBInfo);
  } else {
    let filterTemps = await getTemp();
    filterTemps
      ? res.status(200).json(filterTemps)
      : res.status(404).json({ error: "NO ESTAN LLEGANDO LOS TEMPERAMENTOS" });
  }
});


module.exports = router;
