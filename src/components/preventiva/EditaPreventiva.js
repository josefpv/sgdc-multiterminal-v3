import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DateTimePicker from "../common/DateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  clearPreventiva,
  deletePreventiva,
  fetchPreventivas,
} from "../../redux/actions/preventiva";
import { connect } from "react-redux";
import { format } from "date-fns";

const EditaPreventiva = ({
  preventivas,
  fetchPreventivas,
  clearPreventiva,
  deletePreventiva,
}) => {
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    document.title = "SGDC - Edita Preventiva";
    return () => {
      clearPreventiva();
    };
  }, []);

  useEffect(() => {
    if (fecha && fecha !== "") {
      fetchPreventivas(fecha);
    }
  }, [fecha]);

  const handleChangeDate = (fechaSeleccionada) => {
    console.log(fechaSeleccionada);
  };
  const handleDeletePreventiva = (ppu) => {
    deletePreventiva(ppu, fecha);
  };

  const hideResult = () => {};

  return (
    <Grid2
      container
      justifyContent="center"
      alignContent="center"
      sx={{ flexDirection: "column" }}
    >
      <Grid2 md={4} xs={12} sx={{ pt: 4 }}>
        <DateTimePicker
          type={1}
          onChangeDate={(fecha) => hideResult()}
          setSelectedDate={(fechaSelected) => setFecha(fechaSelected)}
          selectedDate={fecha}
          fullWidth={true}
        />
      </Grid2>
      <Grid2 md={4} xs={12} sx={{ pt: 4, maxHeight: 600, overflow: "scroll" }}>
        <List dense={false}>
          {preventivas?.map((b) => (
            <div key={b.ppu}>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => handleDeletePreventiva(b.ppu)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <EventAvailableIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={b.ppu}
                  secondary="Para elimnar haga clic sobre la papelera"
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    preventivas: state.preventiva.preventivaList,
  };
};

export default connect(mapStateToProps, {
  fetchPreventivas,
  deletePreventiva,
  clearPreventiva,
})(EditaPreventiva);
