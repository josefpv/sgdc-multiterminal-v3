import React from "react";

const NotFound = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ paddingTop: "10%" }}>
        <div className="col-12" style={{ textAlign: "center" }}>
          <h1 className="display-1" style={{ color: "#e00000" }}>
            <i className="fa fa-chain-broken"></i>
          </h1>
        </div>
        <div className="col-12" style={{ textAlign: "center" }}>
          <h1 className="display-2">404</h1>
        </div>
        <div className="col-12" style={{ textAlign: "center" }}>
          <h1 className="display-5">Página no encontrada</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
