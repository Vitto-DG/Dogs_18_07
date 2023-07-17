//----------------------------------------MANEJO DE TEMPERAMENTS----------------------------------------------------------//
const getTemp = async () => {
    let getAPIinfo2 = await getAPIinfo();
    let TemperamentosAPI = getAPIinfo2
      .map((el) => el.temperament)
      .sort()
      .join();
    let Temperamentosarray = TemperamentosAPI.split(
      ",",
      TemperamentosAPI.length
    ).sort();
    let TempArrayToSet = new Set(Temperamentosarray);
    let FilteredTemps = Array.from(TempArrayToSet); //ASI YA ES UN ARRAY. PUEDO PASARLO A STRING Y METERLO EN DB.
    FilteredTemps.shift();
    // FilteredTemps.forEach(async (el) => {
    //   await Temperament.create({ name: el });
    // }); //ASI ARRANCO, DSP ME ENTERE DE BULKCREATE
    FilteredTemps = FilteredTemps.map((el) => ({
      name: el,
    }));
    await Temperament.bulkCreate(FilteredTemps);
    return FilteredTemps;
  };
  //--------------------------------------------MANEJO DE TEMPERAMENTS--------------------------------------------//