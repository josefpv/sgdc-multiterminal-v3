import React from "react";
import EvStationIcon from "@mui/icons-material/EvStation";
import TrafficIcon from "@mui/icons-material/Traffic";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";
import PolicyIcon from "@mui/icons-material/Policy";
import MemoryIcon from "@mui/icons-material/Memory";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function SelectedProfileListItem({ onChange, perfilSelected }) {
  //const [selectedIndex, setSelectedIndex] = React.useState(perfilSelected);
  //setSelectedIndex(perfilSelected);

  const handleListItemClick = (event) => {
    console.log(event.target.value);
    onChange(event.target.value);
    //setSelectedIndex(index);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={perfilSelected.toString()}
      exclusive
      fullWidth
      onChange={handleListItemClick}
    >
      <ToggleButton value="1" aria-label="Administrador">
        <Person4Icon /> Administrador
      </ToggleButton>
      <ToggleButton value="2" aria-label="Supervisor">
        <PolicyIcon /> Supervisor
      </ToggleButton>
      <ToggleButton value="3" aria-label="Bombero">
        <EvStationIcon /> Bombero
      </ToggleButton>
      <ToggleButton value="4" aria-label="Semaforo">
        <TrafficIcon /> Semáforo
      </ToggleButton>
      <ToggleButton value="5" aria-label="Movilizador">
        <TransferWithinAStationIcon /> Movilizador
      </ToggleButton>
      <ToggleButton value="7" aria-label="Visualizador">
        <VisibilityIcon /> Visualizador
      </ToggleButton>
      <ToggleButton value="6" aria-label="Automático">
        <MemoryIcon /> Automático
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
