import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PageHeader from "../common/PageHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import CheckIcon from "@mui/icons-material/Check";
import SelectableDataGridBuses from "../common/SelectableDataGridBuses";
import { savePreventiva } from "../../redux/actions/preventiva";
import { connect } from "react-redux";
import { fetchBuses } from "../../redux/actions/buses";
import _ from "lodash";
import { toast } from "react-toastify";

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected { 
    background-color: red;
    border-color: red;
    color: white;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: red;
    color: red;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

const NuevaPreventiva = ({ buses, savePreventiva, fetchBuses }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedBuses, setSelectedBuses] = useState([]);
  const [selectedPPUs, setSelectedPPUs] = useState([]);

  useEffect(() => {
    fetchBuses();
    document.title = "SGDC - Nueva Preventiva";
  }, []);

  const handleSavePreventiva = () => {
    if (!selectedDays.length) {
      toast.error("Debe seleccionar al menos un día.");
      return;
    }

    if (!selectedPPUs.length) {
      toast.error("Debe seleccionar al menos una PPU.");
      return;
    }

    savePreventiva(selectedPPUs, selectedDays);
    setSelectedBuses([]);
    setSelectedDays([]);
    setSelectedPPUs([]);
    fetchBuses();
  };

  const handleSelectBus = (rows) => {
    let ppuLabels = [];
    rows?.map((id) => {
      const ppuObj = _.find(buses, { id });
      ppuLabels.push(ppuObj?.ppu);
    });

    setSelectedPPUs(ppuLabels);
    setSelectedBuses(rows);
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignContent="center"
      sx={{ marginTop: 4, p: 3 }}
    >
      <Grid2 md={6} xs={12}>
        <Grid2 container justifyContent="center" alignContent="center">
          <Grid2 md={12}>
            <Typography>
              <LooksOneIcon color="secondary" />
              Seleccione días que desea agregar programación de preventiva.
            </Typography>
          </Grid2>
          <Grid2 md={6} xs={12} sx={{ paddingTop: 4 }}>
            <style>{css}</style>
            <DayPicker
              locale={es}
              mode="multiple"
              min={1}
              selected={selectedDays}
              onSelect={setSelectedDays}
              footer={`Has seleccionado ${selectedDays.length} días`}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
            />
          </Grid2>
          <Grid2 md={12} xs={12} sx={{ paddingTop: 4 }}>
            {selectedDays.length ? (
              <Grid2 container spacing={1}>
                <Grid2 md={12}>
                  <Divider>Días seleccionados</Divider>
                </Grid2>
                {selectedDays.map((sd) => (
                  <Grid2 key={sd}>
                    <Chip
                      color="secondary"
                      label={format(sd, "dd-MM-yyyy")}
                      variant="outlined"
                    />
                  </Grid2>
                ))}
              </Grid2>
            ) : null}
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 md={6} xs={12}>
        <Grid2 container justifyContent="center" alignContent="center">
          <Grid2 md={12}>
            <Typography>
              <LooksTwoIcon color="secondary" />
              Seleccione buses que incluirá en la programación
            </Typography>
          </Grid2>
          <Grid2 md={6}>
            <Box sx={{ height: 580, width: 450, paddingTop: 4 }}>
              <SelectableDataGridBuses
                buses={buses}
                onSelectBus={handleSelectBus}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 md={12} xs={12} sx={{ pt: 2 }}>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          startIcon={<CheckIcon />}
          onClick={handleSavePreventiva}
        >
          Guardar Programación
        </Button>
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    buses: state.buses.buses,
  };
};

export default connect(mapStateToProps, { savePreventiva, fetchBuses })(
  NuevaPreventiva
);
