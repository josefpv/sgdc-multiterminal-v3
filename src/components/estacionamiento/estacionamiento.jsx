import React, { Component } from "react";
import MenuDescripcion from "../common/menuDescripcion";
import PuestoEstacionamiento from "./common/puestoEstacionamiento";

class Estacionamiento extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <MenuDescripcion
            icono="fa fa-road"
            titulo="Estacionamiento"
            descripcion={null}
          />
          <PuestoEstacionamiento />
        </div>
      </div>
    );
  }
}

export default Estacionamiento;
