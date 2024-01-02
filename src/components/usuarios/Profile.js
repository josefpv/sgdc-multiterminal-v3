import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import BadgeIcon from "@mui/icons-material/Badge";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Loading from "./../common/Loading";
//redux form
import { Form, Field } from "react-final-form";
//redux
import { connect } from "react-redux";
import { getAccessPage } from "../../redux/actions";
import { setLoading, setUnloading } from "./../../redux/actions/global";
import {
  fetchProfiles,
  fetchUser,
  updateUserInfo,
  fetchTerminales,
} from "./../../redux/actions/usuarios";
import PageHeader from "../common/PageHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Profile = (props) => {
  let formValidated = false;
  const formPerfil = useRef();

  const obtieneUsuario = async (usuarioId) => {
    await props.fetchProfiles();
    await props.fetchUser(usuarioId);
    props.setUnloading();
  };

  const doSubmit = async ({ password, passwordMatch, terminalId }) => {
    props.setLoading();
    const { nombre, usuario } = props.usuario;
    const { perfilSelected, match } = props;
    const { params } = match;

    if (password !== passwordMatch) {
      toast.error("Las contraseñas no coinciden.");
    } else {
      console.log("Actualizando");
      await props.updateUserInfo(
        params.id,
        nombre,
        usuario,
        password,
        perfilSelected,
        terminalId
      );
    }

    props.setUnloading();
  };

  const handleChangeTerminal = async (e) => {
    const terminalId = e.target.value;

    props.setLoading();
    const { nombre, usuario } = props.usuario;
    const { perfilSelected, match } = props;
    const { params } = match;

    await props.updateUserInfo(
      params.id,
      nombre,
      usuario,
      undefined,
      perfilSelected,
      terminalId,
      true
    );

    props.setUnloading();
  };

  const validateForm = ({ password, passwordMatch }) => {
    formValidated = password && passwordMatch ? true : false;
  };

  const required = (value) => (value ? undefined : "Este campo es requerido");

  useEffect(() => {
    document.title = "SGDC - Usuario";
    const { match, getAccessPage, fetchTerminales } = props;
    const { params } = match;
    getAccessPage();
    fetchTerminales();
    obtieneUsuario(params.id);
  }, []);

  const { usuario: userInfo, isLoading, auth } = props;
  const { nombre, usuario, perfilSelected } = userInfo;

  return isLoading ? (
    <Loading label="Cargando Usuario..." />
  ) : (
    <PageHeader title="Mi Perfil">
      <Grid2 container justifyContent="center">
        <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
          <BadgeIcon sx={{ fontSize: 100 }} />
        </Grid2>
        <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2" component="div">
            {nombre}
          </Typography>
        </Grid2>
        <Grid2 xs={12} md={12} sx={{ textAlign: "center", color: "red" }}>
          <Typography variant="button" component="div">
            {auth.userData.perfil} - {auth.userData.terminal}
          </Typography>
        </Grid2>
      </Grid2>
      <Form
        onSubmit={doSubmit}
        validate={(values) => validateForm(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} ref={formPerfil}>
            <Grid2
              container
              justifyContent="center"
              spacing={2}
              sx={{ paddingTop: 3 }}
            >
              <Grid2 xs={4} md={4}>
                <Field name="password">
                  {({ input, meta }) => (
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      color="secondary"
                      inputProps={{ type: "password" }}
                      helperText={
                        meta.error &&
                        meta.touched && (
                          <small style={{ color: "red" }}>
                            Debe ingresar una contraseña válida
                          </small>
                        )
                      }
                      {...input}
                    />
                  )}
                </Field>
              </Grid2>
              <Grid2 xs={4} md={4}>
                <Field name="passwordMatch">
                  {({ input, meta }) => (
                    <TextField
                      fullWidth
                      label="Repita su password"
                      variant="outlined"
                      color="secondary"
                      inputProps={{ type: "password" }}
                      helperText={
                        meta.error &&
                        meta.touched && (
                          <small style={{ color: "red" }}>
                            Debe reingresar la contraseña
                          </small>
                        )
                      }
                      {...input}
                    />
                  )}
                </Field>
              </Grid2>
              {props.auth.userData.perfilId === 1 ||
              props.auth.userData.perfilId === 2 ? (
                <>
                  <Grid2 xs={12} md={12}>
                    <Divider>
                      <Chip
                        color="secondary"
                        icon={<DirectionsRunIcon />}
                        variant="outlined"
                        label="Ir a otro terminal..."
                      />
                    </Divider>
                  </Grid2>
                  <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
                    <Typography variant="caption" component="div">
                      Deberás iniciar sesión nuevamente al cambiar de terminal.
                    </Typography>
                  </Grid2>
                  <Grid2 xs={4} md={4}>
                    <Field name="terminalId">
                      {({ input, meta }) => (
                        <FormControl fullWidth>
                          <InputLabel id="terminal-label">Terminal</InputLabel>
                          <Select
                            name="terminalId"
                            color="secondary"
                            labelId="terminal-label"
                            id="terminal"
                            label="Terminal"
                            helpertext={
                              meta.error && meta.touched ? (
                                <small style={{ color: "red" }}>
                                  Debe asignarle un terminal al usuario
                                </small>
                              ) : undefined
                            }
                            onChange={(e) => {
                              input.onChange(e);
                              handleChangeTerminal(e);
                            }}
                            value={input.value}
                          >
                            {props.terminales &&
                              props.terminales.map((terminal) => (
                                <MenuItem key={terminal.id} value={terminal.id}>
                                  {terminal.nombre}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Grid2>
                </>
              ) : null}
              <Grid2 xs={12}></Grid2>
              <Grid2 xs={4}>
                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  startIcon={<RefreshIcon />}
                >
                  Actualizar perfil
                </Button>
              </Grid2>
            </Grid2>
          </form>
        )}
      />
    </PageHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.loading,
    auth: state.auth,
    usuario: state.usuarios.usuario,
    perfiles: state.usuarios.perfiles,
    perfilSelected: state.usuarios.perfilSelected,
    terminales: state.usuarios.terminales,
  };
};

export default connect(mapStateToProps, {
  setLoading,
  setUnloading,
  fetchProfiles,
  fetchUser,
  fetchTerminales,
  updateUserInfo,
  getAccessPage,
})(Profile);
