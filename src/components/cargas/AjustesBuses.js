import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  esES,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import BeenhereIcon from "@mui/icons-material/Beenhere";

import { connect } from "react-redux";
import { fetchBuses, updateBusSetting } from "./../../redux/actions/buses";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const AjustesBuses = ({ buses, fetchBuses, updateBusSetting }) => {
  const handleSaveBusesSetting = (data) => {
    console.log("Bus info: ", data);
    updateBusSetting(data);
  };

  const tableCols = [
    {
      field: "ppu",
      headerName: "PPU",
      width: 90,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      width: 120,
    },
    {
      field: "",
      headerName: "",
      width: 280,
      sortable: false,
      filterable: false,
      hideable: false,
      disableExport: true,
      renderCell: (params) => (
        <Button
          variant={params.row.en_estudio ? "contained" : "outlined"}
          color="secondary"
          size="small"
          sx={{ width: "100%" }}
          style={{ marginLeft: 16 }}
          endIcon={<BeenhereIcon />}
          onClick={() => handleSaveBusesSetting(params.row)}
        >
          EN ESTUDIO
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="row justify-content-center">
      <div className=" col-sm-4 align-self-center" style={{ height: 850 }}>
        <DataGrid
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={buses.length ? false : true}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.loading,
    auth: state.auth,
    buses: state.buses.buses,
  };
};

export default connect(mapStateToProps, { fetchBuses, updateBusSetting })(
  AjustesBuses
);
