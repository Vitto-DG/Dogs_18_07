import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Nav from "../Nav/nav.jsx";
import "./Detail.css";
const Detail = () => {
  const [dog, setDog] = useState({});
  let { name } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/dogs/${name}`)
      .then((response) => response.json())
      .then((response) => setDog(response))
      .catch((error) => {
        window.location.replace("/*");
      });
  }, []);
  const dispatch = useDispatch();

  return (
    <>
      <div className="detail">
        <Nav />
        <div
          className="loading"
          style={!dog.name ? { display: "block" } : { display: "none" }}
        >
          <p> Cargando!</p>
          <img
            src="https://i.gifer.com/origin/4f/4f5d1807ba2d22d9de3f1abb925cab9c_w200.gif"
            alt="Esperando"
            height="300"
            width="300"
          ></img>
        </div>
        <div style={dog.name ? { display: "block" } : { display: "none" }}>
          <div className="detail2">
            <img
              src={dog.image?.url}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://st3.depositphotos.com/5585086/35167/i/600/depositphotos_351677130-stock-photo-dog-on-a-sofa-in.jpg";
              }}
              alt="Perro no encontrado"
            ></img>
            <div>Nombre: {dog.name}</div>
            <div>Espectativa de vida: {dog.life_span} años</div>
            <div>Peso: {dog.weight?.metric} Kg.</div>
            <div>Altura: {dog.height?.metric} Cm.</div>
            <div>Temperamento: {dog.temperament?.map((el) => el.name)}</div>
            <div>Origen: {dog.origin ? dog.origin : "Unknown"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
