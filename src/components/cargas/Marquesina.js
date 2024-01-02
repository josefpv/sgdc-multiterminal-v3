import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchMarquesinas,
  setDataModal,
  unsetDataModal,
  updateModalData,
  toggleBtnModal,
  getStatusConnetor,
  getStatusConnectorAll,
  fetchInnerStateChargers,
  handleTecle,
  handleTecleTime,
  handleAllTecles,
  stopChargeInternally,
  stopChargerOnFailure,
  stopPendingChargings,
  setChargerFree,
  handleInspectCharger,
  handleSync,
} from "./../../redux/actions/cargas";
import { connect } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import GrillaMarquesina from "./GrillaMarquesina";

const Marquesina = ({
  marquesina,
  indexMarquesina,
  handleAllTecles,
  onClick,
  onDetienCargaOnAveria,
  opcionesVisible = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleAccionMasivaTecle = async (marquesinaId, accion) => {
    handleAllTecles(marquesinaId, accion);
  };

  const { id, nombre: titulo, cargadores } = marquesina;

  return (
    <Grid2 container>
      <Grid2 md={12} xs={12}>
        <Grid2 container>
          <Grid2 md={11} xs={11} sx={{ textAlign: "center" }}>
            <Typography component="div" variant="h5">{`M${titulo}`}</Typography>
          </Grid2>
          {opcionesVisible && (
            <Grid2 md={1} xs={1} sx={{ textAlign: "right" }}>
              <Tooltip title="Opciones">
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleOpenOptions}
                >
                  <MoreVertIcon color="secondary" />
                </IconButton>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseOptions}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleAccionMasivaTecle(id, 1)}>
                  <ListItemIcon>
                    <ArrowDownwardIcon fontSize="small" />
                  </ListItemIcon>
                  Bajar todos los tecles
                </MenuItem>
                <MenuItem onClick={() => handleAccionMasivaTecle(id, 2)}>
                  <ListItemIcon>
                    <ArrowUpwardIcon fontSize="small" />
                  </ListItemIcon>
                  Subir todos los tecles
                </MenuItem>
              </Menu>
            </Grid2>
          )}
        </Grid2>
      </Grid2>

      <Grid2 md={12} xs={12}>
        <Typography
          component="div"
          variant="caption"
          sx={{ textAlign: "center" }}
        >
          FILAS
        </Typography>
      </Grid2>

      <Grid2 md={12} xs={12} sx={{ overflowY: "scroll" }}>
        {cargadores.length > 0 ? (
          <GrillaMarquesina
            onClick={onClick}
            marquesina={marquesina}
            cargadores={marquesina.cargadores}
            indexMarquesina={indexMarquesina}
            onDetienCargaOnAveria={onDetienCargaOnAveria}
          />
        ) : (
          <Typography>Sin cargadores</Typography>
        )}
      </Grid2>
      <Grid2 md={12} sx={{ marginTop: 2, borderBottomWidth: 2 }}>
        <Divider />
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { handleAllTecles })(Marquesina);
