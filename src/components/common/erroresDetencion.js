import {
  Alert,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  ListSubheader,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState, useEffect } from "react";
import { getErrores } from "../services/erroresDetencion";

const ErroresDetencion = ({ onSeleccionError }) => {
  const [errores, setErrores] = useState([]);
  const [errorActivo, setErrorActvo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState("-");

  useEffect(async () => {
    const { data } = await getErrores();
    if (Object.keys(data).length) {
      setErrores(data);
      setErrorActvo(2);
      setIsLoading(false);
    } else {
      setErrores([]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (socket !== "-" && socket !== "") {
      console.log("enviar...", errorActivo, socket);
      onSeleccionError(errorActivo, socket);
    }
  }, [socket]);

  const handleChange = (event) => {
    setErrorActvo(event.target.value);
  };

  const renderErroresList = (error, index) => {
    if (index > 0 && error?.grupo_codigo !== errores[index - 1].grupo_codigo) {
      return [
        <ListSubheader>Código {error.grupo_codigo}</ListSubheader>,
        <MenuItem key={error.id} value={error.id}>
          {error.error}
        </MenuItem>,
      ];
    } else {
      return (
        <MenuItem key={error.id} value={error.id}>
          {error.error}
        </MenuItem>
      );
    }
  };

  if (!isLoading) {
    return (
      <>
        <Grid2 xs={12}>
          <Alert severity="info">
            Por favor, seleccione el motivo por el cual está reservando
            nuevamente :
          </Alert>
          <Divider />
        </Grid2>
        <Grid2 xs={6}>
          <FormControl fullWidth color="secondary">
            <InputLabel id="demo-simple-select-label">Error</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={errorActivo}
              label="Error"
              onChange={handleChange}
            >
              {errores.map((error, index) => {
                return renderErroresList(error, index);
              })}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={6}>
          <FormControl fullWidth color="secondary">
            <InputLabel id="demo-simple-select-label">Socket</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={socket}
              label="Socket"
              onChange={(event) => setSocket(event.target.value)}
            >
              <MenuItem value="-">Seleccione</MenuItem>
              <MenuItem value="i">Izquierdo</MenuItem>
              <MenuItem value="d">Derecho</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </>
    );
  } else {
    return (
      <div className="col-12" style={{ textAlign: "center", marginTop: 20 }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

export default ErroresDetencion;
