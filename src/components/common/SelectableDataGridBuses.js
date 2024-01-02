import React from "react";
import { connect } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  esES,
} from "@mui/x-data-grid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CircularProgress, Skeleton, Typography } from "@mui/material";

const SelectableDataGridBuses = ({ buses, onSelectBus }) => {
  const tableCols = [
    {
      field: "ppu",
      headerName: "PPU",
      width: 90,
    },
  ];
  if (buses && buses.length) {
    return (
      <DataGrid
        rows={buses}
        columns={tableCols}
        rowHeight={40}
        editMode="row"
        checkboxSelection
        componentsProps={{
          toolbar: { printOptions: { disableToolbarButton: true } },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onProcessRowUpdateError={(error) => console.log("ERROR: ", error)}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        loading={buses.length ? false : true}
        sx={{
          "& .css-7m04wo-MuiButtonBase-root-MuiCheckbox-root.Mui-checked": {
            color: "#fa1e1e",
          },
        }}
        onSelectionModelChange={(rowsSelected) => onSelectBus(rowsSelected)}
      />
    );
  }

  return <CircularProgress color="secondary" />;
};

export default SelectableDataGridBuses;
