import React, { useEffect, useState } from "react";
import _ from "lodash";
import Loading from "../common/Loading";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
//redux
import { connect } from "react-redux";
import { getAccessPage } from "../../redux/actions";
import { setUnloading } from "./../../redux/actions/global";
import {
  fetchUsuarios,
  toggleUserState,
  setCurrentPage,
  setSearchQuery,
  setSortColumn,
  resetViewUser,
  fetchPenddingUsers,
  acceptDeclineUser,
} from "./../../redux/actions/usuarios";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const SolicitudesPendientes = ({
  penddingUsers,
  getAccessPage,
  fetchPenddingUsers,
  acceptDeclineUser,
  setUnloading,
}) => {
  useEffect(() => {
    getAccessPage();
    fetchPenddingUsers();
    //setUnloading();
  }, []);

  const onAcceptDeclineUser = (userId, action) => {
    acceptDeclineUser(userId, action);
  };

  return (
    <Grid2 container justifyContent="center">
      {penddingUsers && !penddingUsers.length ? (
        <Grid2 xs={12} md={4} sx={{ paddingTop: 10 }}>
          <Typography sx={{ textAlign: "center" }}>
            <CheckIcon color="success" sx={{ fontSize: 100 }} />
          </Typography>
          <Typography component="div" variant="h3" sx={{ textAlign: "center" }}>
            Nada por aquí
          </Typography>
          <Typography
            component="div"
            variant="button"
            sx={{ textAlign: "center" }}
          >
            No hay solicitudes de usuarios por aprobar.
          </Typography>
        </Grid2>
      ) : (
        <>
          <Grid2 xs={12} md={12}>
            <Typography
              component="div"
              variant="button"
              sx={{ textAlign: "center" }}
            >
              Solicitudes de usuarios por aprobar.
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={12} md={4} lg={6} xl={4}>
            <List>
              {penddingUsers.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <>
                      <Tooltip title="Aceptar">
                        <IconButton
                          edge="end"
                          aria-label="accept"
                          onClick={() => onAcceptDeclineUser(user.id, 1)}
                        >
                          <CheckIcon color="success" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Rechazar">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onAcceptDeclineUser(user.id, 0)}
                        >
                          <BlockIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "red" }} alt={user.nombre}>
                      {user.nombre[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.nombre}
                    secondary={`${user.perfilNombre} - ${user.usuario}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
        </>
      )}
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.global.loading,
    usuarios: state.usuarios.usuarios,
    currentPage: state.usuarios.currentPage,
    pageSize: state.usuarios.pageSize,
    searchQuery: state.usuarios.searchQuery,
    sortColumn: state.usuarios.sortColumn,
    penddingUsers: state.usuarios.penddingUsers,
  };
};
export default connect(mapStateToProps, {
  setUnloading,
  fetchUsuarios,
  toggleUserState,
  setCurrentPage,
  setSearchQuery,
  setSortColumn,
  resetViewUser,
  getAccessPage,
  fetchPenddingUsers,
  acceptDeclineUser,
})(SolicitudesPendientes);
