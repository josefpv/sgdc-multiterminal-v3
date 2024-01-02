import React, { Component } from "react";
import Battery from "./battery";

class ListaBuses extends Component {
  state = {};

  render() {
    const { data, onSeleccion, seleccion } = this.props;
    return data.length ? (
      <div className="col " style={{ height: "300px", overflowY: "scroll" }}>
        {data.map((item) => {
          return (
            <button
              key={item.id}
              className={
                seleccion && seleccion.id === item.id
                  ? "btn btn-dark"
                  : "btn btn-outline-dark"
              }
              onClick={() => onSeleccion(item)}
              style={{ width: "100%", borderRadius: 0, marginBottom: "5px" }}
            >
              {item.ppu} - <Battery soc={item.SOC} /> {item.SOC}%
            </button>
          );
        })}
      </div>
    ) : (
      <div className="col" style={{ textAlign: "center" }}>
        <p className="display-2">
          <i className="fa fa-compass" style={{ color: "#cccccc" }}></i>
        </p>
        <p className="lead">No se han detectado buses cerca.</p>
      </div>
    );
  }
}

export default ListaBuses;
