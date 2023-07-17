import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

const landing = () => {
  return (
    <div className="root">
      <div className="positioning">
        <h1 className="title">Perros de Henry</h1>
        <h3 className="subtitle">
          Encuentra al que estas buscando
        </h3>
        <div>
          <Link to="/home">
            <button className="botoncitoo">Entrar!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default landing;
