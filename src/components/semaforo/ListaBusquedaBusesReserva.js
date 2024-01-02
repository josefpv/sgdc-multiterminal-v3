import React from "react";
import ItemBus from "./ItemBus";
import { Typography } from "@mui/material";

const ListaBusquedaBusesReserva = ({
  data,
  campoFilto,
  onChangeDerivacion,
}) => {
  if (campoFilto != "") {
    return data.map((bus, index) => {
      return (
        <ItemBus
          bus={bus}
          key={index}
          onChangeDerivacion={onChangeDerivacion}
        />
      );
    });
  } else {
    return null;
  }
};

export default ListaBusquedaBusesReserva;
