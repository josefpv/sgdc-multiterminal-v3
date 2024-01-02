import React, { useEffect } from "react";
import _ from "lodash";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const configuraFilasPorTerminal = (
  terminalId,
  totalCargadores,
  indexMarquesina
) => {
  let inicioNumFila = 1;
  let filas = null;
  let cantFilas = null;
  switch (terminalId) {
    //Camilo Henriquez
    case 1:
      cantFilas = totalCargadores === 8 ? 10 : 16;
      filas = _.range(1, cantFilas);
      return filas.length === 9 ? (
        <Grid2 container>
          {/* PARA LAS LETRAS */}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          {filas.map((fila, index) => (
            <Grid2 xs key={index}>
              <h5 style={{ fontSize: "1vw" }}>
                {fila} <i className="fa fa-arrow-down"></i>
              </h5>
            </Grid2>
          ))}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
        </Grid2>
      ) : (
        <Grid2 container>
          {/* PARA LAS LETRAS */}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          {filas.map((fila, index) => (
            <Grid2 xs key={index}>
              <h5 style={{ fontSize: "1vw" }}>
                {fila} <i className="fa fa-arrow-down"></i>
              </h5>
            </Grid2>
          ))}
        </Grid2>
      );
    //las torres
    case 2:
      //console.log("TOTAL CARGADORES: ", totalCargadores);
      if (totalCargadores === 4) {
        cantFilas = 9;
        filas = _.range(1, cantFilas);
        return (
          <Grid2 container>
            {/* PARA LAS LETRAS */}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            {filas.map((fila, index) => (
              <Grid2 xs key={index}>
                <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                  {fila} <i className="fa fa-arrow-down"></i>
                </h5>
              </Grid2>
            ))}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
          </Grid2>
        );
      }
      if (totalCargadores === 5) {
        cantFilas = 11;
        filas = _.range(1, cantFilas);
        return (
          <Grid2 container>
            {/* PARA LAS LETRAS */}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            {filas.map((fila, index) => (
              <Grid2 xs key={index}>
                <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                  {8 + index + 1} <i className="fa fa-arrow-down"></i>
                </h5>
              </Grid2>
            ))}

            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
          </Grid2>
        );
      }
      if (totalCargadores === 2) {
        cantFilas = 5;
        filas = _.range(1, cantFilas);
        return (
          <Grid2 container>
            {/* PARA LAS LETRAS */}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>

            {filas.map((fila, index) => (
              <Grid2 xs key={index}>
                <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                  {8 + index + 1} <i className="fa fa-arrow-down"></i>
                </h5>
              </Grid2>
            ))}

            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
          </Grid2>
        );
      }
    //santa clara
    case 3:
      cantFilas = totalCargadores === 8 ? 10 : 16;
      filas = _.range(1, cantFilas);
      return (
        <Grid2 container>
          {/* PARA LAS LETRAS */}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          {filas.map((fila, index) => (
            <Grid2 xs key={index}>
              <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                {fila} <i className="fa fa-arrow-down"></i>
              </h5>
            </Grid2>
          ))}
        </Grid2>
      );
    //los tilos
    case 4:
      if (indexMarquesina == 1) {
        inicioNumFila = 11;
        cantFilas = 20 + 1;
      } else if (indexMarquesina == 2) {
        inicioNumFila = 21;
        cantFilas = 28 + 1;
      } else {
        inicioNumFila = 1;
        cantFilas = totalCargadores * 2 + 1;
      }

      if (totalCargadores == 5) {
        filas = _.reverse(_.range(inicioNumFila, cantFilas));
        return (
          <Grid2 container>
            {/* PARA LAS LETRAS */}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            {filas.map((fila, index) => (
              <Grid2 xs key={index}>
                <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                  {fila} <i className="fa fa-arrow-down"></i>
                </h5>
              </Grid2>
            ))}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
          </Grid2>
        );
      } else {
        filas = _.reverse(_.range(inicioNumFila, cantFilas));
        return (
          <Grid2 container>
            {/* PARA LAS LETRAS */}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            {filas.map((fila, index) => (
              <Grid2 xs key={index}>
                <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                  {fila} <i className="fa fa-arrow-down"></i>
                </h5>
              </Grid2>
            ))}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
          </Grid2>
        );
      }
    case 5:
      //La Primavera
      if (indexMarquesina == 0) {
        inicioNumFila = 1;
        cantFilas = 4 + 1;
      } else if (indexMarquesina == 1) {
        inicioNumFila = 5;
        cantFilas = 18 + 1;
      } else {
        inicioNumFila = 19;
        cantFilas = 34 - 1;
      }

      if (indexMarquesina == 0) {
        filas = _.range(inicioNumFila, cantFilas);
        return (
          <Grid2 container>
            {/* PARA LAS LETRAS */}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            {filas.map((fila, index) => (
              <Grid2 xs key={index}>
                <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                  {fila} <i className="fa fa-arrow-down"></i>
                </h5>
              </Grid2>
            ))}
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
            <Grid2 xs>
              <h5 style={{ fontSize: "1vw" }}></h5>
            </Grid2>
          </Grid2>
        );
      }
      filas = _.range(inicioNumFila, cantFilas);
      return (
        <Grid2 container>
          {/* PARA LAS LETRAS */}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          {filas.map((fila, index) => (
            <Grid2 xs key={index}>
              <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                {fila} <i className="fa fa-arrow-down"></i>
              </h5>
            </Grid2>
          ))}
        </Grid2>
      );

    //camilo henriquez
    case 6:
      cantFilas =
        totalCargadores == 6
          ? (totalCargadores + 1) * 2 + 1
          : totalCargadores * 2 + 1;
      filas = _.range(1, cantFilas);
      return (
        <Grid2 container>
          {/* PARA LAS LETRAS */}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          {filas.map((fila, index) => (
            <Grid2 xs key={index}>
              <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                {fila} <i className="fa fa-arrow-down"></i>
              </h5>
            </Grid2>
          ))}
        </Grid2>
      );
    //alvaro casanova
    case 7:
      cantFilas = totalCargadores * 2 + 1;
      inicioNumFila = 1;

      if (indexMarquesina == 1) {
        inicioNumFila = 17;
        cantFilas = 32 + 1;
      } else if (indexMarquesina == 2) {
        inicioNumFila = 33;
        cantFilas = 46 + 1;
      } else if (indexMarquesina == 3) {
        inicioNumFila = 47;
        cantFilas = 58 + 1;
      } else if (indexMarquesina == 5) {
        inicioNumFila = 17;
        cantFilas = 34 + 1;
      }

      filas = _.range(inicioNumFila, cantFilas);
      return (
        <Grid2 container>
          {/* PARA LAS LETRAS */}
          <Grid2 xs>
            <h5 style={{ fontSize: "1vw" }}></h5>
          </Grid2>
          {filas.map((fila, index) => (
            <Grid2 xs key={index}>
              <h5 style={{ fontSize: "1vw", textAlign: "center" }}>
                {fila} <i className="fa fa-arrow-down"></i>
              </h5>
            </Grid2>
          ))}
        </Grid2>
      );
    default:
      return <Typography>Terminal aún no configurado</Typography>;
  }
};

const FilaCabeceraPuestos = ({
  cargadores,
  userData,
  cantColumnas,
  indexMarquesina,
  terminalId,
}) => {
  //const terminalId = userData.terminalId // ===> cuando empiece a recibir terminal desde el usuario
  return configuraFilasPorTerminal(
    terminalId,
    cargadores.length,
    indexMarquesina
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    cantColumnas: state.auth.configuracionApp.cantColumnas,
    terminalId: state.auth.configuracionApp.terminalId,
  };
};

export default connect(mapStateToProps, {})(FilaCabeceraPuestos);
