import React from "react";
import "./Paginado.css";

const Paginado = ({
  DogsPerPage,
  allDogs,
  paginaSig,
  paginaPrev,
  CurrentPage,
  firstPage,
  lastPage,
  paginado
}) => {
  const pageNums = [];
  for(let i = 0; i < Math.ceil(allDogs / DogsPerPage); i++){
    pageNums.push(i + 1)
  }
  return (
    <nav className="paginado">
      <button className="botoncito" onClick={firstPage}>
        Inicial
      </button>
      <button
        disabled={CurrentPage == 1}
        className="botoncito"
        onClick={paginaPrev}
      >
        -Prev 
      </button>
      <ul className="">
      {
        pageNums && 
        pageNums.map(num => (
          <button key={num} className={CurrentPage === num ? 
          "current" : "botoncito_nums"} onClick={() => 
          paginado(num)}>{num}</button>
        ))
      }
      </ul>
      <button
        className="botoncito"
        disabled={CurrentPage == Math.ceil(allDogs / DogsPerPage)}
        onClick={paginaSig}
      >
        Sig- 
      </button>
      <button className="botoncito" onClick={lastPage}>
        Final
      </button>
    
    </nav>
  );
};

export default Paginado;
