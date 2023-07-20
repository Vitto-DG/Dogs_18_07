import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";

const Card = ({ name, weight, image, temperament }) => {
  let navigate = useNavigate();
  function DetailHandler(e) {
    e.preventDefault();
    navigate(`/dog/${name}`);
  }
  return (
    <>
      <div className="Card" onClick={(el) => DetailHandler(el)}>
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // esto evita que loopee o sea en error no hace nada y setea el src a la img que quiero
            currentTarget.src =
              "https://s.t13.cl/sites/default/files/styles/manualcrop_850x475/public/t13/field-imagen/2016-09/1473948114-perroenojado.jpg.jpeg?itok=dE-zVi3m";
          }}
          alt="HOLA"
          width="175vh"
          height="120vh"
          
        />
        <h3>{name ? name : "XD"}</h3>
        <div>Peso: {`${weight} KG`}</div>
        <div>
          Temperamento: {temperament
            ? temperament.map((el) => el.name)
            : " No se encontraron temperamentos."}
        </div>
      </div>
    </>
  );
};

export default Card;
