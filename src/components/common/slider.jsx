import React from "react";
import withStyles from "@mui/styles/withStyles";
import makeStyles from "@mui/styles/makeStyles";
import Slider from "@mui/material/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
  },
  margin: {
    height: theme.spacing(8),
  },
}));

function valuetext(value) {
  return `${value}s`;
}

function getColorSlider(estado) {
  //disponilbe (1) => verde
  if (estado === 1) {
    return {
      color: "#32b343",
    };
  }
  //camino a estacionar "reservado" (2) => amarillo
  if (estado === 2) {
    return {
      color: "#f0c818",
    };
  }
  //cargando (3) => azul
  if (estado === 3) {
    return {
      color: "#03428a",
    };
  }
  //ocuapdo pero con carga finalizada (4)=> rojo
  if (estado === 4) {
    return {
      color: "#cc1d02",
    };
  }
  //no existe (5) => gris
  if (estado === 5) {
    return {
      color: "#fc9235",
    };
  }
  //ocupado sin conectar
  //???????????
  //deshabilitado (0)=> naranaja
  if (estado === 0) {
    return {
      backgroundColor: "#e07400",
    };
  }

  return {
    color: "#32b343",
  };
}

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 40,
    label: "40",
  },
];

const TecleSlider = withStyles({
  root: {
    color: "red",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -2,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
})(Slider);

export default function SliderRange(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TecleSlider
        defaultValue={props.tiempo}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        max={40}
        min={1}
        valueLabelDisplay="on"
        marks={marks}
        estadoCargador={props.estadoCargador}
        onChange={(e, value) => {
          props.onTiempoTecle(value);
        }}
      />
    </div>
  );
}
