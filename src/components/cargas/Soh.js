import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { connect } from "react-redux";
import { getAccessPage } from "../../redux/actions";
import {
  fetchSohBuses,
  fetchHistorySoh,
  setEditingRow,
  clearSohHistory,
  updateSoH,
  clearSoH,
} from "./../../redux/actions/buses";
//Datagrid
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  esES,
} from "@mui/x-data-grid";
import DateTimePicker from "../common/DateTimePicker";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Button from "@mui/material/Button";
//graph
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { toast } from "react-toastify";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.soh !== oldRow.soh) {
    return `Name from '${oldRow.soh}' to '${newRow.soh}'`;
  }
  return null;
}

const Soh = ({
  fetchSohBuses,
  fetchHistorySoh,
  setEditingRow,
  editingRowMode,
  clearSohHistory,
  clearSoH,
  buses,
  historySoh,
  ppuSelected,
  updateSoH,
  auth,
}) => {
  const [fecha, setFecha] = useState(new Date());
  const [ppu, setPpu] = useState("");
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  useEffect(() => {
    fetchSohBuses(fecha);
    return () => {
      clearSoH();
    };
  }, []);

  useEffect(() => {
    fetchSohBuses(fecha);
  }, [fecha]);

  const tableCols = [
    {
      field: "ppu",
      headerName: "PPU",
      width: 90,
    },
    {
      field: "soh",
      headerName: "SoH %",
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "",
      headerName: "",
      width: 150,
      sortable: false,
      filterable: false,
      hideable: false,
      disableExport: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ width: "100%" }}
          style={{ marginLeft: 16 }}
          endIcon={<HistoryToggleOffIcon />}
          onClick={() => fetchHistorySoh(params, fecha)}
        ></Button>
      ),
    },
  ];

  const handleStopEditing = (params, event) => {
    console.log(params.row);
  };

  const handleRowEditing = async (newValue, oldValue) => {
    if (newValue.soh && newValue.soh !== "") {
      //se cambio soh
      const data = {
        ppu: newValue.ppu,
        soh: newValue.soh,
        usuarioId: auth.userData.id,
        fecha,
      };
      updateSoH(data);
      return newValue;
      //llamada a api
    } else {
      return { ...oldValue, soh: 0 };
    }
  };

  const renderGraph = (historySoh) => {
    console.log(historySoh);
    return (
      <Grid2 container>
        <Grid2 xs={12} md={12}>
          <Typography
            component="div"
            variant="h4"
          >{`Historial SoH ${ppuSelected}`}</Typography>
        </Grid2>
        <Grid2 xs={12} md={12}>
          <AreaChart
            width={1000}
            height={400}
            data={historySoh}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area dataKey="soh" stroke="#d32f2f" fill="#ed5c5c" />
          </AreaChart>
        </Grid2>
        <Grid2 xs={12} md={12} sx={{ padding: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => clearSohHistory()}
          >
            Cerrar
          </Button>
        </Grid2>
      </Grid2>
    );
  };

  return (
    <Grid2 container>
      <Grid2 xs={3} md={3} sx={{ height: 800 }}>
        <DataGrid
          getRowId={(row) => row.ppu}
          rows={buses}
          columns={tableCols}
          disableSelectionOnClick
          rowHeight={40}
          editMode="row"
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            toolbar: { printOptions: { disableToolbarButton: true } },
          }}
          experimentalFeatures={{ newEditingApi: true }}
          onProcessRowUpdateError={(error) => console.log("ERROR: ", error)}
          processRowUpdate={handleRowEditing}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={buses.length ? false : true}
        />
      </Grid2>
      <Grid2 xs={9} md={9}>
        <Grid2 container>
          {editingRowMode ? (
            <Grid2 xs={12} md={12}>
              <Alert severity="info">
                Modo edición - El modo edición esta activo, presione enter al
                terminar de editar.
              </Alert>
            </Grid2>
          ) : null}
        </Grid2>
        <Grid2 xs={12} md={12} sx={{ paddingTop: 10, textAlign: "center" }}>
          <DateTimePicker
            type={1}
            onChangeDate={(fecha) => clearSoH()}
            setSelectedDate={(fechaSelected) => setFecha(fechaSelected)}
            selectedDate={fecha}
            disableFuture={true}
          />
        </Grid2>
        {!historySoh.length ? (
          <Grid2 xs={12} md={12}>
            <Typography
              variant="button"
              component="div"
              sx={{ textAlign: "center" }}
            >
              Haga clic en {<HistoryToggleOffIcon />} para ver mas detalles.
            </Typography>
          </Grid2>
        ) : (
          renderGraph(historySoh)
        )}
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    buses: state.buses.sohBuses,
    editingRowMode: state.buses.editingRowMode,
    historySoh: state.buses.historyGraph,
    ppuSelected: state.buses.selectedPpuSoh,
  };
};

export default connect(mapStateToProps, {
  fetchSohBuses,
  fetchHistorySoh,
  setEditingRow,
  clearSohHistory,
  updateSoH,
  clearSoH,
})(Soh);
