import React from "react";

const Unavailable = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ paddingTop: "10%" }}>
        <div className="col-12" style={{ textAlign: "center" }}>
          <h1 className="display-1" style={{ color: "#e0a800" }}>
            <i className="fa fa-exclamation-triangle"></i>
          </h1>
        </div>
        <div className="col-12" style={{ textAlign: "center" }}>
          <h1 className="display-5">No Disponible</h1>
        </div>
        <div className="col-12" style={{ textAlign: "center" }}>
          <p className="lead">
            La página solicitada no está disponible o se encuentra bajo
            mantención.
          </p>
          <p className="lead">
            Por favor intente más tarde o póngase en conctacto con el
            administrador del servicio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unavailable;
