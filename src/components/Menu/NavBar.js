import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import STPLogo from "./../../images/logo.svg";
import { useLocation, NavLink } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { fetchPenddingUsers } from "./../../redux/actions/usuarios";

import { connect } from "react-redux";
import { Fade, Popper } from "@mui/material";
import SolicitudesPendientes from "../usuarios/SolicitudesPendientes";

const NavBar = ({
  penddingUsers,
  isSignedIn,
  userInfo,
  fetchPenddingUsers,
}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openNotification, setOpenNotifation] = useState(false);
  const [anchorNotification, setAnchorNotification] = useState(null);

  useEffect(() => {
    let intervalo = 0;
    fetchPenddingUsers();
    intervalo = setInterval(() => {
      fetchPenddingUsers();
    }, 10000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotification = (event) => {
    console.log("Abriendo notifcaciones");
    setAnchorNotification(event.currentTarget);
    setOpenNotifation((prev) => !prev);
  };
  const handleCloseNotification = (event) => {
    console.log("Abriendo notifcaciones");
    setAnchorNotification(null);
    setOpenNotifation(false);
  };

  const accesos = {
    1: [
      "seleccion",
      "cargabombero",
      "movilizador",
      "usuarios",
      "historial",
      "soh",
      "ajustes",
      "estados",
      "preventiva",
      "logout",
    ],
    2: [
      "seleccion",
      "cargabombero",
      "movilizador",
      "usuarios",
      "historial",
      "soh",
      "ajustes",
      "estados",
      "preventiva",
      "logout",
    ],
    3: [
      "seleccion",
      "cargabombero",
      "historial",
      "soh",
      "estados",
      "logout",
      "preventiva",
    ],
    4: ["seleccion", "historial", "soh", "ajustes", "preventiva", "logout"],
    5: ["movilizador"],
    7: ["movilizador", "logout"],
  };

  const renderMenus = () => {
    const perfilId = userInfo.perfilId;
    const menus = [];

    accesos[perfilId]?.map((path) => {
      menus.push(pages[path]);
    });

    return menus;
  };

  const pages = {
    seleccion: (
      <NavLink
        key="semaforo"
        to="/seleccion"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>Semáforo</MenuItem>
      </NavLink>
    ),
    cargabombero: (
      <NavLink
        key="bomberos"
        to="/cargabombero"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Bomberos</Typography>
        </MenuItem>
      </NavLink>
    ),
    movilizador: (
      <NavLink
        key="movilizador"
        to="/movilizador"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Movilizador</Typography>
        </MenuItem>
      </NavLink>
    ),
    usuarios: (
      <NavLink
        key="usuarios"
        to="/usuarios"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Usuarios</Typography>
        </MenuItem>
      </NavLink>
    ),
    historial: (
      <NavLink
        key="historial"
        to="/historial"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Historial</Typography>
        </MenuItem>
      </NavLink>
    ),
    soh: (
      <NavLink
        key="soh"
        to="/soh"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">SoH</Typography>
        </MenuItem>
      </NavLink>
    ),
    estados: (
      <NavLink
        key="estados"
        to="/cambiaestados"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Estados</Typography>
        </MenuItem>
      </NavLink>
    ),
    ajustes: (
      <NavLink
        key="ajustes"
        to="/ajustes"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Ajustes</Typography>
        </MenuItem>
      </NavLink>
    ),
    preventiva: (
      <NavLink
        key="preventiva"
        to="/preventiva"
        style={(isActive) => ({
          color: isActive ? "red" : "black",
          textDecoration: "none",
        })}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Preventiva</Typography>
        </MenuItem>
      </NavLink>
    ),
  };
  const settings = [
    <NavLink
      key="miperfil"
      to={`/profile/${userInfo.id}`}
      style={(isActive) => ({
        color: isActive ? "red" : "black",
        textDecoration: "none",
      })}
    >
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">Mi Perfil</Typography>
      </MenuItem>
    </NavLink>,
    <NavLink
      key="salir"
      to="/logout"
      style={(isActive) => ({
        color: isActive ? "red" : "black",
        textDecoration: "none",
      })}
    >
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">Salir</Typography>
      </MenuItem>
    </NavLink>,
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={STPLogo} height={30} />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {renderMenus()}
            </Menu>
          </Box>

          <Box
            sx={{ flexGrow: 1, margin: 0, display: { xs: "none", md: "flex" } }}
          >
            {renderMenus()}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {(userInfo && userInfo.perfilId === 1) ||
            userInfo.perfilId === 2 ? (
              <>
                <Tooltip title="Solicitudes Pendientes">
                  <IconButton
                    aria-describedby="menu-appbar-solicitudes"
                    onClick={handleOpenNotification}
                    sx={{ paddingRight: 3 }}
                    color={
                      penddingUsers && penddingUsers.length
                        ? "secondary"
                        : "disabled"
                    }
                  >
                    <NotificationsActiveIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar-solicitudes"
                  anchorEl={anchorNotification}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openNotification}
                  onClose={handleCloseNotification}
                >
                  <Box sx={{ width: 600, padding: 4 }}>
                    <SolicitudesPendientes />
                  </Box>
                </Menu>
              </>
            ) : null}

            <Tooltip title="Perfil - Salir">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                color="secondary"
              >
                <Avatar sx={{ bgcolor: "#f30f0f" }}>
                  {userInfo.nombre[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => setting)}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    penddingUsers: state.usuarios.penddingUsers,
  };
};
export default connect(mapStateToProps, { fetchPenddingUsers })(NavBar);
