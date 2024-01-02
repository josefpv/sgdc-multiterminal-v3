import React, { Component } from "react";
//100% - >95
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
//<95 - 70
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";
//<70 - 60
import BatteryCharging60Icon from "@mui/icons-material/BatteryCharging60";
//<60 - 50
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
//<50 - 30
import BatteryCharging30Icon from "@mui/icons-material/BatteryCharging30";
//<30 - 20
import BatteryCharging20Icon from "@mui/icons-material/BatteryCharging20";
//<20 - 1
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
//0
import BatteryUnknownIcon from "@mui/icons-material/BatteryUnknown";
import { green, red, orange } from "@mui/material/colors";

class Battery extends Component {
  generaIconoBateria = () => {
    const { soc } = this.props;
    if (!soc || soc <= 0)
      return <BatteryUnknownIcon style={{ color: red[500], fontSize: 50 }} />;
    if (soc > 1 && soc <= 20)
      return <BatteryAlertIcon style={{ color: red[500], fontSize: 50 }} />;
    if (soc > 20 && soc <= 30)
      return (
        <BatteryCharging20Icon style={{ color: red[500], fontSize: 50 }} />
      );
    if (soc > 30 && soc < 50)
      return (
        <BatteryCharging30Icon style={{ color: orange[500], fontSize: 50 }} />
      );
    if (soc >= 50 && soc < 60)
      return (
        <BatteryCharging50Icon style={{ color: orange[500], fontSize: 50 }} />
      );
    if (soc >= 60 && soc < 70)
      return (
        <BatteryCharging60Icon style={{ color: orange[500], fontSize: 50 }} />
      );
    if (soc >= 70 && soc < 95)
      return (
        <BatteryCharging90Icon style={{ color: green[500], fontSize: 50 }} />
      );

    if (soc >= 95 && soc <= 100)
      return (
        <BatteryChargingFullIcon style={{ color: green[500], fontSize: 50 }} />
      );
  };

  render() {
    return this.generaIconoBateria();
  }
}

/*
class Battery extends Component {
  generaIconoBateria = () => {
    const { soc } = this.props;
    if (soc <= 14)
      return (
        <i className="fa fa-battery-empty blink" style={{ color: "#d90b0b" }} />
      );
    if (soc > 14 && soc <= 30)
      return (
        <i
          className="fa fa-battery-quarter blink"
          style={{ color: "#d90b0b" }}
        />
      );
    if (soc > 30 && soc <= 60)
      return <i className="fa fa-battery-half" style={{ color: "#d9680b" }} />;
    if (soc > 60 && soc <= 80)
      return (
        <i
          className="fa fa-battery-three-quarters"
          style={{ color: "#d9b30b" }}
        />
      );

    if (soc > 80 && soc <= 100)
      return <i className="fa fa-battery-full" style={{ color: "#038a20" }} />;
  };

  render() {
    return this.generaIconoBateria();
  }
}

*/

export default Battery;
