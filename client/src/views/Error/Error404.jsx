import React from "react";
import "./Error404.css";

const Error404 = () => {
  return (
    <>
      <div className="container2">
        <div>
          <p>ERROR 404!</p>
        </div>
        <div>
          <p>UUh algo no salió bien!</p>
        </div>
        <button
          className="getback"
          onClick={() => window.location.replace("/home")}
        >
          Volver al Home
        </button>
      </div>
    </>
  );
};

export default Error404;
