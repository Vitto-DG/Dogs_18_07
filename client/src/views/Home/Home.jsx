import React, { useEffect, useState } from "react";
import "./Home.css";
import Searchbar from "../../components/Searchbar/searchbar";
import Card from "../../components/Card/card";
import {
  getDogs,
  Order,
  FilterByTemperament,
  FilterCreated,
  getTemperament,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../../components/Paginado/Paginado.jsx";
import Nav from "../../components/Nav/nav.jsx";


const Home = () => {
  const Temperaments = useSelector((state) => state.Temperaments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperament());
  }, [dispatch]);
  const allDogs = useSelector((state) => state.Dogs);

  const orderFilter = useSelector((state) => state.orderFilter.FilterApiDB);
  const [CurrentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [DogsPerPage, setDogsPerPage] = useState(8);
  const TotalPages = Math.ceil(allDogs.length / DogsPerPage);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
  //-------------------PAGINADO------------------//

  const pageNums = [];
  for(let i = 0; i < Math.ceil(allDogs.length / DogsPerPage); i++){
    pageNums.push(i);
  }

  const paginaSig = () => {
    setCurrentPage(CurrentPage + 1);
  };
  const paginaPrev = () => {
    if (CurrentPage !== 1) setCurrentPage(CurrentPage - 1);
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(TotalPages);
  };
  //------------------PAGINADO-------------------//
  //-------------------------INDICES----------------------
  const IndexOfLastDog = CurrentPage * DogsPerPage;
  const IndexOfFirstDog = IndexOfLastDog - DogsPerPage;
  const CurrentDogs = allDogs.slice(IndexOfFirstDog, IndexOfLastDog);
  //--------------------------INDICES------------------------
  let actualorderFilter = useSelector((state) => state.orderFilter);
  //--------------------FILTRAR POR TEMPERAMENTO------------------//
  function Filtersbytemp(e) {
    e.preventDefault();
    dispatch(FilterCreated(actualorderFilter.FilterApiDB));
    dispatch(FilterByTemperament(e.target.value));
    dispatch(Order(actualorderFilter.order));
    setCurrentPage(1);
  }
  //--------------------FILTRAR POR TEMPERAMENTO--------------------//

  //---------------------FILTRAR POR DB----------------------//
  function FiltersCreated(e) {
    e.preventDefault();
    dispatch(FilterCreated(e.target.value));
    dispatch(FilterByTemperament(actualorderFilter.filterTemps));
    dispatch(Order(actualorderFilter.order));
    setCurrentPage(1);
  }
  //----------------------FILTRAR POR DB----------------------//
  //-----------------------ORDENADO--------------------//
  function Orders(e) {
    e.preventDefault();
    dispatch(Order(e.target.value));
    setCurrentPage(1);
  }
  //-----------------------ORDENADO---------------------//
  return (
    <>
      <div className="container">
        <Nav></Nav>
        <div>
          <div className="wrapper2">
            <div className="Sortby">
              Orden por:
              <select defaultValue="asc" onChange={(e) => Orders(e)}>
                <option value="asc">Nombre A-Z</option>
                <option value="dsc">Nombre Z-A</option>
                <option value="minwgt">Peso Min/max</option>
                <option value="maxwgt">Peso Max/Min</option>
              </select>
            </div>
            <div className="Filterby">
              Filtro por:
              <select defaultValue={"all"} onChange={(e) => FiltersCreated(e)}>
                <option value="all">Todos</option>
                <option value="created">En BD</option>
                <option value="API">Desde API</option>
              </select>
              <select defaultValue="all" onChange={(e) => Filtersbytemp(e)}>
                <option value="all">Todos</option>
                {Temperaments.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
            </div>
            <Searchbar></Searchbar>
          </div>
          {CurrentDogs?.length == 0 && orderFilter !== "created" ? (
            <div className="loading">
              Cargando...
              <img
                src="https://www.snau.es/blog/wp-content/uploads/2017/12/051d5320f7824fad820489edf5e1fc76.gif"
                alt="Error al cargar"
                height="350"
                width="350"
              ></img>
            </div>
          ) : (
            <div>
              <div className="wrapper">
                {CurrentDogs.length > 0 ? (
                  CurrentDogs.map((el) => (
                    <div class="card">
                      <Card
                        name={el.name}
                        weight={el.weight?.metric}
                        temperament={el.temperament}
                        image={el.image?.url}
                        createdByDB={el.createdByDB}
                      ></Card>
                    </div>
                  ))
                ) : (
                  <div
                    className="loading2"
                    style={
                      // eslint-disable-next-line eqeqeq
                      orderFilter == "created" && CurrentDogs.length == 0
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <p>No se encontraron los perros</p>
                    <img
                      src="https://www.snau.es/blog/wp-content/uploads/2017/12/051d5320f7824fad820489edf5e1fc76.gif"
                      alt="Error al cargar"
                      height="300"
                      width="300"
                    ></img>
                  </div>
                )}
              </div>
              <Paginado
                DogsPerPage={DogsPerPage}
                allDogs={allDogs.length}
                CurrentPage={CurrentPage}
                setCurrentPage={setCurrentPage}
                firstPage={firstPage}
                paginaPrev={paginaPrev}
                paginado={paginado}
                paginaSig={paginaSig}
                lastPage={lastPage}
              ></Paginado>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
