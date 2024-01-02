import React, { useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import FilaCabeceraPuestos from "./FilaCabeceraPuestos";
import PuestoGrilla from "./PuestoGrilla";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const GrillaMarquesina = ({
  marquesina,
  cargadores,
  indexMarquesina,
  cantColumnas,
  terminalId,
  statusConnectorAll,
  cargadoresEstadoInterno,
  onClick,
  onDetienCargaOnAveria,
}) => {
  const obtienePuestos = (cargadores) => {
    let pistolas = [];

    cargadores.map((cargador) => {
      cargador.pistolas.map(
        (pistola) =>
          (pistolas = [
            ...pistolas,
            { cargadorOrigen: cargador, pistola: { ...pistola } },
          ])
      );
    });

    //console.log(pistolas);
    return pistolas;
  };

  const agrupaPuestos = (puestos) => {
    let agrupados = 0;
    switch (terminalId) {
      case 1:
        //Maipu
        if (puestos.length === 16) {
          //agrupacion para ultima marquesina, se agrupan en 8 columnas
          agrupados = _.chunk(puestos, 8);
        } else {
          //se agrupan en 14 columnas
          agrupados = _.chunk(puestos, cantColumnas);
        }

        if (agrupados.length === 3) {
          //Marquesina 1, se ordena de forma distinta
          agrupados.map((filaPuesto, index) => {
            if (index === 0 || index === 1) {
              agrupados[index] = [
                ...filaPuesto,
                { pistola: { id: index, estado: 0 } },
              ];
            } else {
              agrupados[index] = [
                { pistola: { id: index, estado: 0 } },
                ...filaPuesto,
              ];
            }
          });
        } else {
          //Para saber si los cargadores son los de la ultima marquesina y agregar puestos vacios
          if (agrupados[0].length === 8) {
            //console.log("Cargadores de la marquesina D");
            agrupados.map((filaPuesto, index) => {
              if (index === 0) {
                agrupados[index] = [
                  { pistola: { id: 111, estado: 0 } },
                  { pistola: { id: 222, estado: 0 } },
                  { pistola: { id: 333, estado: 0 } },
                  ...filaPuesto,
                  { pistola: { id: index, estado: 0 } },
                  { pistola: { id: 444, estado: 0 } },
                  { pistola: { id: 555, estado: 0 } },
                  { pistola: { id: 666, estado: 0 } },
                ];
              } else {
                agrupados[index] = [
                  { pistola: { id: index, estado: 0 } },
                  { pistola: { id: 777, estado: 0 } },
                  { pistola: { id: 888, estado: 0 } },
                  { pistola: { id: 999, estado: 0 } },
                  ...filaPuesto,
                  { pistola: { id: 101010, estado: 0 } },
                  { pistola: { id: 111111, estado: 0 } },
                  { pistola: { id: 121212, estado: 0 } },
                ];
              }
            });
          } else {
            //console.log("No son cargadores de la marquesina D");
            agrupados.map((filaPuesto, index) => {
              if (index === 0) {
                agrupados[index] = [
                  ...filaPuesto,
                  { pistola: { id: index, estado: 0 } },
                ];
              } else {
                agrupados[index] = [
                  { pistola: { id: index, estado: 0 } },
                  ...filaPuesto,
                ];
              }
            });
          }
        }
        break;
      case 2:
        //Las Torres
        agrupados = [puestos];
        agrupados.map((filaPuesto, index) => {
          if (filaPuesto.length == 8) {
            if (filaPuesto.length == 8 && filaPuesto[0].pistola.id == 137) {
              agrupados[index] = [
                { pistola: { id: 11111, estado: 0 } },
                { pistola: { id: 22222, estado: 0 } },
                { pistola: { id: 33333, estado: 0 } },
                { pistola: { id: 55555, estado: 0 } },
                { pistola: { id: 66666, estado: 0 } },
                ...filaPuesto,
                { pistola: { id: 77777, estado: 0 } },
                { pistola: { id: 88888, estado: 0 } },
              ];
            } else {
              agrupados[index] = [
                { pistola: { id: 11111, estado: 0 } },
                { pistola: { id: 22222, estado: 0 } },
                { pistola: { id: 33333, estado: 0 } },
                ...filaPuesto,
                { pistola: { id: 55555, estado: 0 } },
                { pistola: { id: 66666, estado: 0 } },
                { pistola: { id: 77777, estado: 0 } },
                { pistola: { id: 88888, estado: 0 } },
              ];
            }
          } else if (filaPuesto.length == 10) {
            agrupados[index] = [
              { pistola: { id: 99999, estado: 0 } },
              { pistola: { id: 12121, estado: 0 } },
              { pistola: { id: 55454, estado: 0 } },
              ...filaPuesto,
              { pistola: { id: 13131, estado: 0 } },
              { pistola: { id: 14141, estado: 0 } },
              { pistola: { id: 15151, estado: 0 } },
            ];
          } else if (filaPuesto.length == 2) {
            //seria 4 para los dos cargadores
            agrupados[index] = [
              { pistola: { id: 16161, estado: 0 } },
              { pistola: { id: 17171, estado: 0 } },
              { pistola: { id: 18181, estado: 0 } },
              { pistola: { id: 19191, estado: 0 } },
              { pistola: { id: 21212, estado: 0 } },
              ...filaPuesto,
              { pistola: { id: 47474, estado: 0 } },
              { pistola: { id: 23232, estado: 0 } },
              { pistola: { id: 24242, estado: 0 } },
              { pistola: { id: 25252, estado: 0 } },
              { pistola: { id: 26262, estado: 0 } },
              { pistola: { id: 27272, estado: 0 } },
              { pistola: { id: 28282, estado: 0 } },
              { pistola: { id: 29292, estado: 0 } },
            ];
          } else if (filaPuesto.length == 4) {
            agrupados[index] = [
              { pistola: { id: 32323, estado: 0 } },
              { pistola: { id: 34343, estado: 0 } },
              { pistola: { id: 35353, estado: 0 } },
              ...filaPuesto,
              { pistola: { id: 36363, estado: 0 } },
              { pistola: { id: 37373, estado: 0 } },
              { pistola: { id: 38383, estado: 0 } },
              { pistola: { id: 39393, estado: 0 } },
              { pistola: { id: 41414, estado: 0 } },
              { pistola: { id: 42424, estado: 0 } },
              { pistola: { id: 43434, estado: 0 } },
              { pistola: { id: 45454, estado: 0 } },
              { pistola: { id: 46464, estado: 0 } },
            ];
          }
        });
        break;
      case 3:
        //Sta Clara
        agrupados = [puestos];
        agrupados.map((filaPuesto, index) => {
          if (index === agrupados.length - 1) {
            agrupados[index] = [
              ...filaPuesto,
              { pistola: { id: index, estado: 0 } },
            ];
          }
        });
        break;
      case 4:
        //Los Tilos
        agrupados = [puestos];
        agrupados.map((filaPuesto, index) => {
          //console.log("PUESTO: ", filaPuesto);
          if (filaPuesto.length == 10) {
            //marquesina a y b
            agrupados[index] = [
              { pistola: { id: 11111, estado: 0 } },
              { pistola: { id: 22222, estado: 0 } },
              ...filaPuesto,
              { pistola: { id: 77777, estado: 0 } },
              { pistola: { id: 88888, estado: 0 } },
            ];
          } else {
            //marquesina c
            agrupados[index] = [
              { pistola: { id: 99999, estado: 0 } },
              { pistola: { id: 12121, estado: 0 } },
              { pistola: { id: 32232, estado: 0 } },
              ...filaPuesto,
              { pistola: { id: 13131, estado: 0 } },
              { pistola: { id: 14141, estado: 0 } },
              { pistola: { id: 15151, estado: 0 } },
            ];
          }
        });
        break;
      case 5:
        // Primavera
        agrupados = [puestos];
        agrupados.map((filaPuesto, index) => {
          //console.log("PUESTO: ", filaPuesto);
          if (filaPuesto.length == 4) {
            //marquesina a y b
            agrupados[index] = [
              { pistola: { id: 11111, estado: 0 } },
              { pistola: { id: 44444, estado: 0 } },
              { pistola: { id: 34566, estado: 0 } },
              { pistola: { id: 67533, estado: 0 } },
              ...filaPuesto,
              { pistola: { id: 77777, estado: 0 } },
              { pistola: { id: 88888, estado: 0 } },
              { pistola: { id: 33321, estado: 0 } },
              { pistola: { id: 12424, estado: 0 } },
              { pistola: { id: 45454, estado: 0 } },
              { pistola: { id: 12134, estado: 0 } },
            ];
          } else {
            //marquesina c
            agrupados[index] = [...filaPuesto];
          }
        });
        break;
      case 6:
        //camilo herniquez
        agrupados = [puestos];
        agrupados.map((filaPuesto, index) => {
          if (agrupados[0].length === 12) {
            agrupados[index] = [
              ...filaPuesto,
              { pistola: { id: 9393, estado: 0 } },
              { pistola: { id: 9292, estado: 0 } },
            ];
          } else {
            agrupados[index] = [...filaPuesto];
          }
        });
        break;
      case 7:
        //Alvaro Casanova
        // console.log("PUESTOS: ", puestos);

        agrupados = [puestos];
        agrupados.map((filaPuesto, index) => {
          agrupados[index] = [...filaPuesto];
        });
        break;
      default:
        break;
    }

    return agrupados;
  };

  const obtieneLetras = (pos) => {
    let letras = [];
    switch (terminalId) {
      case 1:
        //maipu
        switch (indexMarquesina) {
          case 0:
            letras = ["A", "B", "C"];
            break;
          case 1:
            letras = ["D", "E"];
            break;
          case 2:
            letras = ["F", "G"];
            break;
          case 3:
            letras = ["H", "I"];
            break;
          default:
            letras = ["A", "B", "C"];
            break;
        }
        break;
      case 2:
        //las torres
        switch (indexMarquesina) {
          case 0:
            letras = ["A"];
            break;
          case 1:
            letras = ["C"];
            break;
          case 2:
            letras = ["B"];
            break;
          case 3:
            letras = ["D"];
            break;
          default:
            letras = ["F"];
            break;
        }
        break;
      case (3, 4, 5, 6, 7):
        //otros terminales
        switch (indexMarquesina) {
          case 0:
            letras = ["A"];
            break;
          case 1:
            letras = ["B"];
            break;
          case 2:
            letras = ["C"];
            break;
          case 3:
            letras = ["D"];
            break;
          case 4:
            letras = ["E"];
            break;
          case 5:
            letras = ["F"];
            break;
          case 6:
            letras = ["G"];
            break;
          case 7:
            letras = ["H"];
            break;
          case 8:
            letras = ["I"];
            break;
          default:
            letras = ["A"];
            break;
        }
        break;
      default:
        switch (indexMarquesina) {
          case 0:
            letras = ["A"];
            break;
          case 1:
            letras = ["B"];
            break;
          case 2:
            letras = ["C"];
            break;
          case 3:
            letras = ["D"];
            break;
          default:
            letras = ["F"];
            break;
        }
        break;
    }

    return letras[pos];
  };

  const puestosMarquesina = obtienePuestos(cargadores);
  const puestosAgrupados =
    puestosMarquesina && agrupaPuestos(puestosMarquesina, cantColumnas);

  return (
    <div style={{ minWidth: "900px" }}>
      <FilaCabeceraPuestos
        indexMarquesina={indexMarquesina}
        cargadores={cargadores}
      />
      {puestosAgrupados &&
        puestosAgrupados.map((puesto, index) => (
          <Grid2 container key={index}>
            <Grid2 xs sx={{ textAlign: "center", paddingTop: "20px" }}>
              <strong>
                {obtieneLetras(index)} <i className="fa fa-arrow-right"></i>
              </strong>
            </Grid2>
            {puesto.map((p, indexPuesto) =>
              p.pistola ? (
                <PuestoGrilla
                  key={
                    p.pistola.hasOwnProperty("id")
                      ? p.pistola.id
                      : indexPuesto + p.pistola.id
                  }
                  cargadorOrigen={p.cargadorOrigen}
                  estado={p.pistola.estado}
                  onClick={onClick}
                  puesto={p.pistola}
                  marquesina={marquesina}
                  connectorStatus={statusConnectorAll}
                  onDetienCargaOnAveria={onDetienCargaOnAveria}
                  estadoInterno={
                    cargadoresEstadoInterno[
                      cargadoresEstadoInterno.findIndex(
                        (ei) => ei.nombre === p.pistola.nombre
                      )
                    ]
                  }
                />
              ) : (
                <PuestoGrilla
                  key={indexPuesto}
                  maxColumnas={columnas}
                  columnaActual={index + 1}
                  estado={0}
                  puesto=""
                />
              )
            )}
          </Grid2>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    cantColumnas: state.auth.configuracionApp.cantColumnas,
    terminalId: state.auth.configuracionApp.terminalId,
    statusConnectorAll: state.cargas.statusConnectorAll,
    cargadoresEstadoInterno: state.cargas.cargadoresEstadoInterno,
  };
};

export default connect(mapStateToProps, {})(GrillaMarquesina);
