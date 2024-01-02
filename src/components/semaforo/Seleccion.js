import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import BusesProximosTerminal from "../common/listaSeleccionReserva";
import BusesLista from "./ListaSeleccionReservaManual";
//redux
import { connect } from "react-redux";
import { getAccessPage } from "../../redux/actions";
import { fetchBuses, fetchBusesAproximados } from "../../redux/actions/buses";
//redux form
import { Field, Form } from "react-final-form";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { LinearProgress, TextField, Typography } from "@mui/material";
import PageHeader from "../common/PageHeader";
import ItemBus from "./ItemBus";
import ListaBusquedaBusesReserva from "./ListaBusquedaBusesReserva";

const Seleccion = (props) => {
  let formData = {
    ppu: "",
    soc: "",
    validated: false,
  };
  const [ppu, setPpu] = useState("");
  const [soc, setSoc] = useState("");
  let intevalAprox = 0;

  const filterBuses = () => {
    console.log("Se filtan buses de nuevo");
    const searchQuery = ppu;
    if (searchQuery && searchQuery.length >= 4) {
      const { buses } = props.buses;
      let filtered = buses;

      if (searchQuery) {
        filtered = buses.filter((bus) =>
          bus.ppu.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }

      return filtered;
    }
    return [];
  };

  const doSubmit = () => {
    return null;
  };

  useEffect(() => {
    props.getAccessPage();
    props.fetchBuses();
    props.fetchBusesAproximados();
    intevalAprox = setInterval(() => {
      //console.log("PASO AQUI");
      props.fetchBusesAproximados();
    }, 5000);
    //setIntervalAproximados(intevalAprox);
    const { ppu } = props.history.location.state
      ? props.history.location.state
      : "";
    ppu && toast.info(`Se ha reservado el puesto para la ${ppu} exitosamente.`);
    document.title = "SGDC - Semaforo";
    return () => {
      //console.log("limpio");
      clearInterval(intevalAprox);
    };
  }, []);

  const setPpuState = (inputValue) => {
    setPpu(inputValue);
  };

  //lista buses
  const { aproximados: buses } = props.buses;
  return (
    <PageHeader title="Asignación de Cargas">
      <Grid2
        container
        justifyContent="center"
        alignContent="center"
        flexDirection="column"
        sx={{ marginTop: 4 }}
      >
        <Grid2 md={6}>
          <Form
            onSubmit={doSubmit}
            initialValues={{ ...formData }}
            validate={({ ppu }) => setPpuState(ppu)}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="ppu">
                  {(props) => (
                    <TextField
                      autoComplete="off"
                      label="PPU"
                      variant="outlined"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      id="input-usuario"
                      color="secondary"
                      fullWidth
                      helperText="Ingrese una PPU para comenzar con la búsqueda"
                    />
                  )}
                </Field>
              </form>
            )}
          />
        </Grid2>
        <Grid2
          md={6}
          sx={ppu !== "" && ppu ? { height: 580, overflow: "scroll" } : {}}
        >
          {ppu != "" ? (
            <ListaBusquedaBusesReserva
              data={filterBuses()}
              campoFiltro={ppu}
              onChangeDerivacion={filterBuses}
            />
          ) : null}
        </Grid2>
        <Grid2 md={6}>
          {!ppu ? (
            <Grid2 container sx={{ marginTop: 2 }}>
              <Grid2 md={12}>
                {buses.length ? (
                  <BusesProximosTerminal data={buses} />
                ) : (
                  <>
                    {/* <Typography variant="h1" sx={{ textAlign: "center" }}>
                      <TrackChangesIcon fontSize="inherit" color="secondary" />
                    </Typography> */}
                    <Typography sx={{ textAlign: "center" }}>
                      Detectando buses aproximándose al terminal...
                    </Typography>
                    <LinearProgress color="secondary" />
                  </>
                )}
              </Grid2>
            </Grid2>
          ) : null}
        </Grid2>
      </Grid2>
    </PageHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    buses: state.buses,
  };
};

export default connect(mapStateToProps, {
  fetchBuses,
  fetchBusesAproximados,
  getAccessPage,
})(Seleccion);
