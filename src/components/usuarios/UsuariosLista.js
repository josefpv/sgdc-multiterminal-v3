import React, { useEffect } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Loading from "../common/Loading";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
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
import { DataGrid, esES } from "@mui/x-data-grid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";

const UsuariosLista = ({
  usuarios,
  isLoading,
  pageSize,
  currentPage,
  sortColumn,
  searchQuery,
  auth,
  getAccessPage,
  fetchUsuarios,
  fetchPenddingUsers,
  setUnloading,
  toggleUserState,
  setCurrentPage,
  setSearchQuery,
  setSortColumn,
  acceptDeclineUser,
  resetViewUser,
}) => {
  useEffect(() => {
    getAccessPage();
    fetchUsuarios();
    fetchPenddingUsers();
    setUnloading();
    return () => {
      resetViewUser();
    };
  }, []);

  const renderEstado = ({ row }) => {
    return (
      <Switch
        color="secondary"
        value={row.activo}
        checked={row.activo ? true : false}
        onChange={() => toggleUserState(row)}
      />
    );
  };

  const renderEdita = ({ row }) => {
    return (
      <Link to={`usuario/${row.id}`}>
        <IconButton color="secondary">
          <EditIcon />
        </IconButton>
      </Link>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "perfil", headerName: "Perfil", width: 200 },
    { field: "terminal", headerName: "Terminal", width: 150 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    {
      field: "activo",
      headerName: "Estado",
      width: 80,
      renderCell: renderEstado,
    },
    {
      field: "",
      headerName: "Editar",
      width: 50,
      renderCell: renderEdita,
    },
  ];

  const onToggleUserState = async (usuario) => {
    toggleUserState(usuario);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPageData = () => {
    const usuariosTodos = usuarios;

    let filtered = usuariosTodos;
    if (searchQuery) {
      filtered = usuariosTodos.filter((m) =>
        m.nombre.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const usuariosFinal = paginate(sorted, currentPage, pageSize);
    return { totalCount: usuariosTodos.length, data: usuariosFinal };
  };

  const onAcceptDeclineUser = (userId, action) => {
    acceptDeclineUser(userId, action);
  };

  const { length: count } = usuarios;

  const { totalCount, data: usuariosFinal } = getPageData();

  const descripcionMenu = "";

  return isLoading ? (
    <Loading label="Cargando Usuarios..." />
  ) : (
    <>
      <Grid2 container justifyContent="center">
        <Grid2 sm={12} xs={12} md={12} lg={8} xl={8} sx={{ height: 700 }}>
          <DataGrid
            rows={usuarios}
            columns={columns}
            disableSelectionOnClick
            rowHeight={40}
            onProcessRowUpdateError={(error) => console.log("ERROR: ", error)}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            loading={usuarios.length ? false : true}
            pageSize={14}
            rowsPerPageOptions={[14]}
          />
        </Grid2>
      </Grid2>
    </>
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
})(UsuariosLista);
