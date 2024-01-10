import "date-fns";
import React from "react";
//to style
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import esLocale from "date-fns/locale/es";

const DateTimePicker = ({
  type,
  onChangeDate,
  setSelectedDate,
  selectedDate,
  disableFuture = false,
  fullWidth = false,
}) => {
  // The first commit of Material-UI
  //console.log("current: ", new Date());
  //const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    console.log("change: ", date);
    let [day, month, year] = new Date(date)
      .toLocaleDateString("es-ES")
      .split("/");
    const fechaFiltro = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    onChangeDate(fechaFiltro);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
      <DesktopDatePicker
        color="secondary"
        label="Fecha"
        inputFormat="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField fullWidth={fullWidth} color="secondary" {...params} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
