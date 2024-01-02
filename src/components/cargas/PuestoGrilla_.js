import React, { Component } from "react";
import { toast } from "react-toastify";
import ErrorIcon from "@mui/icons-material/Error";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BeenhereIcon from "@mui/icons-material/Beenhere";
class PuestoGrilla extends Component {
  state = {
    estadoPistola: "",
  };

  estableceEstado = (estado) => {
    let classes = {};
    //disponilbe (1) => verde
    if (estado === 1) classes = { backgroundColor: "#32b343", height: "120px" };
    //camino a estacionar "reservado" (2) => amarillo
    if (estado === 2) classes = { backgroundColor: "#f0c818", height: "120px" };
    //cargando (3) => azul
    if (estado === 3) classes = { backgroundColor: "#03428a", height: "120px" };
    //ocuapdo pero con carga finalizada (4)=> rojo
    if (estado === 4) classes = { backgroundColor: "#cc1d02", height: "120px" };
    //deshabilitado (5) => naranjs
    if (estado === 5) classes = { backgroundColor: "#fc9235", height: "120px" };
    //ocupado sin conectar
    //???????????
    //no existe (0)=> gris
    if (estado === 0) classes = { backgroundColor: "#ebebeb", height: "120px" };

    return classes;
  };

  onReserva = (puesto, marquesina, cargadorOrigen) => {
    const { estadoInterno } = this.props;

    if (estadoInterno && !estadoInterno.cargando) {
      if (puesto && marquesina && cargadorOrigen)
        this.props.onClick(puesto, marquesina, cargadorOrigen);
    } else {
      cargadorOrigen &&
        toast.warn(
          "La pistola se encuentra a la espera de una solicitud de carga, por favor espere a que finalice para utulizarla."
        );
    }
  };

  obtieneAlerta = () => {
    const {
      marquesina,
      connectorStatus,
      cargadorOrigen,
      puesto,
      onDetienCargaOnAveria,
    } = this.props;
    //console.log("Connector status: ", connectorStatus);

    //para evitar errores por puestos que nos puestos
    const cargadorId = cargadorOrigen ? cargadorOrigen.id : 0;

    if (connectorStatus != null) {
      if (cargadorOrigen && puesto) {
        const statusConnetorPuesto = connectorStatus.filter(
          (cs) =>
            cs.nombre === `STP_${cargadorOrigen.nombre}` &&
            cs.pistolaNro === puesto.nro
        );

        if (statusConnetorPuesto.length > 0) {
          /*
          console.log(
            `STP_${cargadorOrigen.nombre}`,
            statusConnetorPuesto[0].estado
          );
          console.log(`STP_${cargadorOrigen.nombre}`, puesto.estado);
          */
          if (
            statusConnetorPuesto[0].estado !== "cargando" &&
            puesto.estado === 3
          ) {
            //cambia a estado ocupado internamente porque connectorStatus es distinto a cargando
            onDetienCargaOnAveria(
              marquesina.id,
              cargadorId,
              puesto.id,
              puesto.bus.ppu
            );
            return true;
          }
        }
      }
    }

    return false;
  };

  obtieneColorTemperatura = (temperatura) => {
    if (temperatura > 30) {
      return "#ffffff";
    }

    return "#ffffff";
  };

  obtieneClaseMarcaInspeccion = (estado) => {
    console.log("ESTADO: ", estado);
    let classes = {};
    //disponilbe (1) => verde
    if (estado === 1)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //camino a estacionar "reservado" (2) => amarillo
    if (estado === 2)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //cargando (3) => azul 042f61
    if (estado === 3)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //ocuapdo pero con carga finalizada (4)=> rojo
    if (estado === 4)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //deshabilitado (5) => naranjs
    if (estado === 5)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //ocupado sin conectar
    //???????????
    //no existe (0)=> gris
    if (estado === 0)
      classes = {
        backgroundColor: "#ebebeb",
        position: "absolute",
        top: -2,
        right: -2,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderColor: "#ebebeb",
        borderWidth: 2,
        borderStyle: "solid",
      };

    return classes;
  };

  obtieneClaseMarcaEspecial = (estado) => {
    let classes = {};
    //disponilbe (1) => verde
    if (estado === 1)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //camino a estacionar "reservado" (2) => amarillo
    if (estado === 2)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //cargando (3) => azul 042f61
    if (estado === 3)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //ocuapdo pero con carga finalizada (4)=> rojo
    if (estado === 4)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //deshabilitado (5) => naranjs
    if (estado === 5)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //ocupado sin conectar
    //???????????
    //no existe (0)=> gris
    if (estado === 0)
      classes = {
        backgroundColor: "#ebebeb",
        position: "absolute",
        top: -2,
        right: -2,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderColor: "#ebebeb",
        borderWidth: 2,
        borderStyle: "solid",
      };

    return classes;
  };

  render() {
    const { estado, puesto, marquesina, cargadorOrigen, estadoInterno } =
      this.props;
    const estiloPuesto =
      (puesto.alertas && puesto.alertas.length > 0) ||
      puesto.soc >= 99 ||
      (estadoInterno && estadoInterno.errorCarga)
        ? "col puestoGrilla blink"
        : "col puestoGrilla";

    return (
      <div
        className={estiloPuesto}
        style={this.estableceEstado(estado)}
        onClick={() => this.onReserva(puesto, marquesina, cargadorOrigen)}
      >
        <h5 style={{ color: "#ffffff", fontSize: "1vw", textAlign: "center" }}>
          {puesto.nombre ? puesto.nombre : null}
          {puesto.enInspeccion && !puesto.especial ? (
            <div style={this.obtieneClaseMarcaInspeccion(estado)}>
              <FeedbackIcon style={{ color: "#ffffff" }} />
            </div>
          ) : null}
          {puesto.especial ? (
            <div style={this.obtieneClaseMarcaEspecial(estado)}>
              <FeedbackIcon style={{ color: "#ffffff" }} />
            </div>
          ) : null}
        </h5>
        <h6
          style={{ fontSize: "0.9vw", color: "#ffffff", textAlign: "center" }}
        >
          {puesto.nombre && puesto.estado > 1 && puesto.bus.ppu
            ? puesto.bus.ppu
            : ""}
        </h6>
        {estadoInterno && estadoInterno.cargando ? (
          <div
            className="spinner-border text-light"
            role="status"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              fontSize: "10px",
            }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
        {puesto.alertas && puesto.alertas.length > 0 ? (
          <h6 style={{ color: "#ffffff" }}>
            <i className="fa fa-exclamation-triangle" title="Hay alertas"></i>
          </h6>
        ) : null}
        {this.obtieneAlerta() ? (
          <h6
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontSize: "0.5rem",
            }}
          >
            <i
              className="fa fa-exclamation-triangle"
              title="Revisar estado del cargador"
            ></i>
          </h6>
        ) : null}
        {puesto.soc >= 1 ? (
          <h6
            style={{ fontSize: "0.9vw", color: "#ffffff", textAlign: "center" }}
          >
            <i className="fa fa-bolt" style={{ color: "#fcba03" }}></i>{" "}
            {`${parseInt(puesto.soc, 10)}%`}
          </h6>
        ) : null}
        {puesto.tiempoCarga && puesto.tiempoCarga !== "" ? (
          <h6
            style={{ fontSize: "0.9vw", color: "#ffffff", textAlign: "center" }}
          >
            <i className="fa fa-clock-o" style={{ color: "#fcba03" }}></i>{" "}
            {`0${puesto.tiempoCarga.substring(0, 4)}`}
          </h6>
        ) : null}
        {puesto.temperatura && puesto.temperatura > 20 ? (
          <h6
            style={{ fontSize: "0.9vw", color: "#ffffff", textAlign: "center" }}
          >
            <i
              className="fa fa-thermometer-full"
              style={{
                color: this.obtieneColorTemperatura(puesto.temperatura),
              }}
            ></i>{" "}
            {`${Math.round(puesto.temperatura)}°`}
          </h6>
        ) : null}
      </div>
    );
  }
}

export default PuestoGrilla;
