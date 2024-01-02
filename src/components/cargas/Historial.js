import React, { useEffect } from "react";
import Loading from "../common/Loading";
import _ from "lodash";
//dateTimePicker
import MaterialUIPickers from "../common/DateTimePicker.js";

//redux
import { connect } from "react-redux";
import { getAccessPage } from "./../../redux/actions";
import { setLoading, setUnloading } from "./../../redux/actions/global";
import {
  fetchHistorial,
  fetchHistorialFiltro,
  setCurrentPage,
  setFilterMarquesina,
  setSortColum,
  setSearchQuery,
} from "./../../redux/actions/historial";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  esES,
} from "@mui/x-data-grid";

const HistorialCarga = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const customToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          sx={{ color: "red" }}
          csvOptions={{
            allColumns: true,
            fileName: "historial_sgdc",
            delimiter: ";",
            utf8WithBom: true,
          }}
          printOptions={{ disableToolbarButton: true }}
        />
      </GridToolbarContainer>
    );
  };

  const getFechaInicio = ({ row }) => {
    const fecha = row.fechaInicio ? row.fechaInicio.split(" ")[0] : "";
    return fecha;
  };
  const getFechaFin = ({ row }) => {
    const fecha = row.fechaFin ? row.fechaFin.split(" ")[0] : "";
    return fecha;
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "ppu", headerName: "PPU", width: 100 },
    {
      field: "fechaInicio",
      headerName: "Fecha Inicio",
      width: 150,
      valueGetter: getFechaInicio,
    },
    { field: "usuarioInicio", headerName: "Usuario Inicio", width: 350 },
    {
      field: "fechaFin",
      headerName: "Fecha Final",
      width: 150,
      valueGetter: getFechaFin,
    },
    { field: "usuarioFin", headerName: "Usuario Final", width: 350 },
    { field: "socInicio", headerName: "SOC I.", width: 80 },
    { field: "socFinal", headerName: "SOC F.", width: 80 },
    { field: "marquesinaId", headerName: "Marquesina", width: 100 },
    { field: "pistola", headerName: "Pistola", width: 100 },
  ];

  const getHistorialCarga = async () => {
    props.fetchHistorial();
    props.setUnloading();
  };

  useEffect(() => {
    props.getAccessPage();
    getHistorialCarga();
  }, []);

  const handleChangeDate = async (fecha) => {
    props.setLoading();
    props.fetchHistorialFiltro(fecha);
    props.setUnloading();
  };

  const { isLoading } = props;

  return isLoading ? (
    <Loading label="Cargando Historial..." />
  ) : (
    <Grid2 container sx={{ padding: 3 }}>
      <Grid2 xs={12} md={12}>
        <MaterialUIPickers
          type={2}
          onChangeDate={handleChangeDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Grid2>
      <Grid2 xs={12} md={12} sx={{ height: 800, marginTop: 3 }}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={props.historial}
          columns={columns}
          components={{ Toolbar: customToolbar }}
        />
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.loading,
    auth: state.auth,
    historial: state.historial.historial,
    marquesinas: state.historial.marquesinas,
    currentPage: state.historial.currentPage,
    pageSize: state.historial.pageSize,
    searchQuery: state.historial.searchQuery,
    filterMarquesina: state.historial.filterMarquesina,
    filterDate: state.historial.filterDate,
    sortColumn: state.historial.sortColumn,
  };
};

export default connect(mapStateToProps, {
  setLoading,
  setUnloading,
  fetchHistorial,
  fetchHistorialFiltro,
  setCurrentPage,
  setFilterMarquesina,
  setSortColum,
  setSearchQuery,
  getAccessPage,
})(HistorialCarga);
