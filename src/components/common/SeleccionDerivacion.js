import React, { useEffect } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import {
  fetchDerivacionList,
  resetDerivacionList,
  setSelectedDerivacion,
} from "./../../redux/actions/derivacion";
import { connect } from "react-redux";

const SeleccionDerivacion = ({
  derivacionList,
  selectedDerivacion,
  fetchDerivacionList,
  setSelectedDerivacion,
  resetDerivacionList,
  color = "primary",
}) => {
  useEffect(() => {
    fetchDerivacionList();
    return () => {
      resetDerivacionList();
      setSelectedDerivacion(1);
    };
  }, []);

  const handleChangeDerivacion = ({ target }) => {
    console.log(target.value);
    setSelectedDerivacion(target.value);
  };

  if (derivacionList) {
    return (
      <FormControl sx={{ m: 1, minWidth: "100%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Derivación
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedDerivacion}
          onChange={handleChangeDerivacion}
          autoWidth
          label="Derivación"
          fullWidth
          color={color}
        >
          {derivacionList.map((der) => (
            <MenuItem key={der.id} value={der.id}>
              {der.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    derivacionList: state.derivacion.derivacionList,
    selectedDerivacion: state.derivacion.selectedDerivacion,
  };
};

export default connect(mapStateToProps, {
  fetchDerivacionList,
  setSelectedDerivacion,
  resetDerivacionList,
})(SeleccionDerivacion);
