import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "./../images/logo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const NavBar = ({ isSignedIn, userInfo }) => {
  const renderMenus = () => {
    console.log("Navbar: ", userInfo);
    const perfilId = userInfo.perfilId;

    const menus = (
      <React.Fragment>
        {perfilId === 4 ||
        perfilId === 1 ||
        perfilId === 2 ||
        perfilId === 7 ||
        perfilId === 3 ? (
          <NavLink
            className="nav-item nav-link"
            to="/seleccion"
            data-target="#navbarNavAltMarkup"
          >
            Semaforo
          </NavLink>
        ) : null}

        {perfilId === 3 ||
        perfilId === 1 ||
        perfilId === 2 ||
        perfilId === 7 ? (
          <NavLink className="nav-item nav-link" to="/cargabombero">
            Bomberos
          </NavLink>
        ) : null}
        {perfilId === 5 ||
        perfilId === 1 ||
        perfilId === 2 ||
        perfilId === 7 ? (
          <NavLink className="nav-item nav-link" to="/movilizador">
            Movilizador
          </NavLink>
        ) : null}
        {perfilId === 1 || perfilId === 2 ? (
          <NavLink className="nav-item nav-link" to="/usuarios">
            Usuarios
          </NavLink>
        ) : null}
        {/* <a
          className="nav-item nav-link"
          href="http://localhost:3001/"
          target="_blank"
        >
          <OpenInNewIcon style={{ color: "white", fontSize: "20px" }} />
          Turnos
        </a> */}
        {perfilId !== 5 || perfilId === 7 ? (
          <NavLink className="nav-item nav-link" to="/historial">
            Historial
          </NavLink>
        ) : null}
        {perfilId === 4 ||
        perfilId === 1 ||
        perfilId === 2 ||
        perfilId === 7 ||
        perfilId === 3 ? (
          <NavLink className="nav-item nav-link" to="/soh">
            SoH
          </NavLink>
        ) : null}
        {perfilId === 4 ||
        perfilId === 1 ||
        perfilId === 2 ||
        perfilId === 7 ? (
          <NavLink
            className="nav-item nav-link"
            to="/ajustes"
            data-target="#navbarNavAltMarkup"
          >
            Ajustes
          </NavLink>
        ) : null}
        <NavLink className="nav-item nav-link" to={`/profile/${userInfo.id}`}>
          {userInfo.nombre}
        </NavLink>
        <NavLink className="nav-item nav-link" to="/logout">
          <ExitToAppIcon style={{ color: "red", fontSize: "20px" }} />
          Salir
        </NavLink>
      </React.Fragment>
    );

    return menus;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img src={logoImg} width="50" height="30" alt="" loading="lazy" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {isSignedIn && renderMenus()}
          {!isSignedIn && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Iniciar Sesión
              </NavLink>
            </React.Fragment>
          )}
          <a
            className="nav-item nav-link"
            href="http://ol.stpsantiago.cl/"
            target="_blank"
          >
            <OpenInNewIcon style={{ color: "white", fontSize: "20px" }} />
            STP Portal
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
