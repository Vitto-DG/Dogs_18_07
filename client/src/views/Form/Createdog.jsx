/* eslint-disable eqeqeq */
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperament } from "../../redux/actions/index";
import Nav from "../../components/Nav/nav";
import "./Createdog.css";
import validate from "../../components/Validation/Validate.js";


const Createdog = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dogs = useSelector((state) => state.Dogs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);
  const temperaments = useSelector((state) => state.Temperaments); //aca accedo a los temperamentos de la Store y lo asigno al personaje nuevo.
  //aca traigo el input que luego va a ser despachado a la Store para crear el personaje.
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: { url: "" },
    temperament: [],
  });

  const handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dogs.find((el) => el.name.toLowerCase() == input.name.toLowerCase())) {
      alert("Ya existe un perro con ese nombre.");
    } else {
      dispatch(postDog(input));
      alert("Su perro ha sido creado con exito!");
      navigate("/home");
    }
  };
  //el handleChange es el que añade el valor del input al estado que estoy por enviar a store por form. tambien tiene la funcion setErrors que es lo que valida.

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
    setErrors(
      validate({
        ...input,
      })
    );
  };
  return (
    <div className="container1">
      <Nav></Nav>
      <h1>Crea tu propia raza!</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            id="name"
            autocomplete="off"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
        <div className="inputs">
          <label>Altura:</label>
          <input
            type="text"
            value={input.height.metric}
            name="height"
            autocomplete="off"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.height && <p className="error">{errors.height}</p>}
        <div className="inputs">
          <label>Peso:</label>
          <input
            type="text"
            value={input.weight.metric}
            name="weight"
            autocomplete="off"
            onChange={handleChange}
          ></input>
        </div>
        {errors.weight && <p className="error">{errors.weight}</p>}
        <div className="inputs">
          <label>Años de vida:</label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            autocomplete="off"
            onChange={handleChange}
          ></input>
        </div>
        {errors.life_span && <p className="error">{errors.life_span}</p>}
        <div className="inputs">
          <label>Imagen:</label>
          <input
            type="text"
            value={input.image?.url}
            name="image"
            autocomplete="off"
            onChange={(e) =>
              setInput({
                ...input,
                image: { url: e.target.value },
              })
            }
          ></input>
        </div>
        <p>
          Inserte una URL válida o una imagen le será seleccionada.
        </p>
        <div className="inputs">
          <label>Temperamento:</label>
          <select
            onChange={
              input.temperament.length < 6 ? handleSelect : console.log("error")
            }
          >
            {temperaments.map((temp) => (
              <option value={temp.name}>{temp.name}</option>
            ))}
          </select>
        </div>
        {errors.temperament && <p className="error">{errors.temperament}</p>}
        <button id="Create" disabled={true} type="submit">
          Crear perro
        </button>
      </form>
      <div className="temperament">
        {input.temperament?.map((el) => (
          <div class="rowtemps">
            <p>{el}</p>
            <button onClick={() => handleDelete(el)}>X</button>
          </div>
        ))}
      </div>
      <div className="Filler"></div>
    </div>
  );
};

export default Createdog;
