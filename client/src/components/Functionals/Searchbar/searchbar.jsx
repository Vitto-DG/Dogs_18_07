import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDogsName } from "../../../redux/actions/index.js";
import "./searchbar.css";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const name = useSelector((state) => state.Dogs);
  function handleInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    let nodogs = name.find(
      (el) => el.name?.toLowerCase() === input.trim()?.toLowerCase()
    );
    if (input.trim().length === 0) {
      setInput("");
      return alert("No se permiten campos vacios");
    } else if (!nodogs) {
      setInput("");
      return alert("El perro buscado no existe.");
    } else if (input.length > 2) {
      e.preventDefault();
      dispatch(GetDogsName(input));
      setInput("");
    } else {
      alert("Introduce una busqueda valida con al menos 3 caracteres.");
      setInput("");
    }
  }

  return (
    <>
      <div class="search">
        <input
          class="search"
          type="search"
          placeholder="Busca una raza"
          value={input}
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Llamar!
        </button>
      </div>
    </>
  );
};
export default Searchbar;
