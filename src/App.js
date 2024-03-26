import React, { useState, useEffect, useLayoutEffect } from "react";
import { Slide, ToastContainer, Zoom } from "react-toastify";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AjusteCargadores from "./components/cargas/AjustesCargadores";
import Soh from "./components/cargas/Soh";
import Reservas from "./components/cargas/Reservas";
import Cargas from "./components/cargas/Cargas";
import Login from "./components/Inicio/Login";
import Logout from "./components/logout";
import NewAccess from "./components/usuarios/NewAccess";
import Usuarios from "./components/usuarios/Usuarios";
import Usuario from "./components/usuarios/Usuario";
import Profile from "./components/usuarios/Profile";
import CambioEstados from "./components/cargas/CambioEstados";
import CambiaEstadoDetalle from "./components/cargas/CambiaEstadoDetalle";
import HistorialCarga from "./components/cargas/Historial";
import NotFound from "./components/not-found";
import Unavailable from "./components/unavailable";
import Loading from "./components/common/Loading";
//import NavBar from "./components/navBar";
import NavBar from "./components/Menu/NavBar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
//Idle time session
import { useIdleTimer } from "react-idle-timer";
import history from "./history";
//redux
import { connect } from "react-redux";
import { fetchCurrentUser, logOut } from "./redux/actions";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import Seleccion from "./components/semaforo/Seleccion";
import Ajustes from "./components/cargas/Ajustes";
import NotasVersion from "./components/Inicio/NotasVersion";
import Movilizador from "./components/cargas/Movilizador";
import Preventiva from "./components/preventiva/Preventiva";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

let theme = createTheme({
  components: {
    Select: {
      styleOverrides: {
        root: {
          color: "#f30f0f",
        },
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
      light: "#f74c4c",
      dark: "#f74c4c",
    },
    neutro: {
      main: "#000000",
    },
    secondary: {
      main: "#f30f0f",
    },
    background: {
      paper: "#f5f5f5",
    },
    success: {
      main: "#2e7d32",
    },
    error: {
      main: "#ff9800",
    },
    warning: {
      main: "#f57f17",
    },
  },
});

theme = responsiveFontSizes(theme);

function App(props) {
  let IdleTimer = null;
  const [usuario, setUsuario] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useLayoutEffect(() => {
    window.title = "SGDC - STP Santiago";
    props.fetchCurrentUser();
    console.log("Version React: ", React.version);
  }, []);

  const onIdle = (event) => {
    console.log("User is idle", event);
    props.logOut();
    history.push("/");
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: 667 * 60 * 15,
    debounce: 25060,
  });

  const renderHeader = (usuario) => {
    if (props.auth.isSignedIn) {
      return (
        <NavBar
          isSignedIn={props.auth.isSignedIn}
          userInfo={props.auth.userData}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (props.auth && props.auth.isSignedIn === false) {
      history.push("/login");
    }
  }, [props.auth, props.auth.isSignedIn]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        theme="light"
        position="top-right"
        transition={Slide}
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Dialog
        open={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¡CONEXIÓN A INTERNET LENTA!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Tu conexión a internet parece estar lenta por lo que algunas
            funciones de SGDC pueden verse afectadas o pueden demorar más de lo
            normal en completarse. Sin embargo, te recomendamos intentar lo
            siguiente:
          </Typography>
          <Typography gutterBottom>
            - Conéctate a tu red móvil o a una red wifi estable.
          </Typography>
          <Typography gutterBottom>
            - Intenta cambiar a una ubicación más cercana al punto de acceso de
            red si estás conectado a una red wifi.
          </Typography>
          <Typography gutterBottom>
            - Reinicia las conexiones de tu dispositivo movíl (si estás
            conectado desde uno).
          </Typography>
          <Typography gutterBottom>
            - NO REALICES DOS VECES LA MISMA ACCIÓN, por ejemplo, si inicias una
            carga o reservas, espera obtener una respuesta del sistema para
            volver a realizar la misma acción.
          </Typography>
          <Typography gutterBottom>
            En la mayoría de los casos, este problema suele resolverse con el
            tiempo ya que puede deberse a factores externos, sin embargo, si el
            problema persiste despúes de mucho tiempo, contacta al administrador
            del sistema.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setIsInfoOpen(false)}>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
      <Router history={history}>
        <div>
          {renderHeader(usuario)}
          {props.auth.redLenta &&
          props.auth.isSignedIn &&
          Boolean(props.auth.redLentaNotificacionDescartada) === false ? (
            <Alert
              variant="filled"
              severity="warning"
              sx={{ borderRadius: 0, cursor: "pointer" }}
              onClick={() => setIsInfoOpen(true)}
            >
              ¡Vaya! parece que tu red está lenta, SGDC puede tener problemas
              con algunas funciones, haz clic aquí para mayor información.
            </Alert>
          ) : null}
          <Switch>
            <Route path="/seleccion/:ppu?" component={Seleccion} />
            <Route path="/soh" component={Soh} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/nuevoacceso" component={NewAccess} />
            {/* <Route path="/marquesina/:id?/:nombre?" component={Cargas} /> */}
            <Route path="/cargabombero" component={Cargas} />
            <Route path="/ajustes" component={Ajustes} />
            <Route path="/marquesinas/:ppu/:soc?" component={Reservas} />
            <Route path="/movilizador" component={Movilizador} />
            <Route path="/cambiaestados" component={CambioEstados} />
            <Route
              path="/cambiaestadosdetalle"
              component={CambiaEstadoDetalle}
            />
            <Route path="/usuarios" component={Usuarios} />
            <Route path="/usuario/:id" component={Usuario} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/historial" component={HistorialCarga} />
            <Route path="/preventiva" component={Preventiva} />
            <Route path="/notasversion" component={NotasVersion} />
            <Route path="/loading" component={Loading} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/unavailable" component={Unavailable} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchCurrentUser,
  logOut,
})(App);
