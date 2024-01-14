import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { getCurrentVersion } from "../../utils/versionControl";
import { redirectLoggedIn_ } from "../services/authService";
//react-spring
//redux
import { connect } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Grid, Tooltip, Typography } from "@mui/material";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import CodeIcon from "@mui/icons-material/Code";
import OfficeImg from "./../../images/office.svg";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const Login = ({ auth }) => {
  useEffect(() => {
    document.title = "SGDC - Login";
    const { userData } = auth ? auth : null;

    if (auth && auth.isSignedIn) {
      redirectLoggedIn_(userData.perfil.id);
    }
  }, [auth]);

  /*
  componentDidUpdate() {
    const { userData } = props.auth ? props.auth : null;
    if (this.props.auth.isSignedIn) {
      auth.redirectLoggedIn_(userData.perfil.id);
    }
  }
  */

  return (
    <Grid2 container justifyContent="center" sx={{ height: "100vh" }}>
      <Grid2 md={6} xs={12}>
        <LoginForm />
      </Grid2>
      <Grid2 md={6}>
        {!isMobile && (
          <Grid2 sx={{ bottom: 0, position: "absolute" }}>
            <img src={OfficeImg} height={400} width={"100%"} />
          </Grid2>
        )}
        <Grid2 sx={{ bottom: 0, right: 0, position: "absolute" }}>
          <Tooltip title="Notas de versión">
            <Link to="/notasversion" style={{ textDecoration: "none" }}>
              <LiveHelpIcon color="secondary" />
            </Link>
          </Tooltip>
          <Tooltip title={getCurrentVersion()}>
            <CodeIcon color="secondary" />
          </Tooltip>
        </Grid2>
      </Grid2>
    </Grid2>
    /*     <React.Fragment>
      <div className="container-fluid fondoLogin" style={{ height: "100vh" }}>
        <LoginForm />

        <div
          className="row justify-content-end"
          style={{ bottom: 0, position: "absolute" }}
        >
          <div className="col" style={{ color: "#ffffff" }}>
            <p>{getCurrentVersion()}</p>
          </div>
        </div>
      </div>
    </React.Fragment> */
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
