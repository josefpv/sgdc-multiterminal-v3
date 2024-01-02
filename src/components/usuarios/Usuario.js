import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import SelectedProfileListItem from "./SelectedProfileList";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "./../common/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
//redux form
import { Form, Field } from "react-final-form";
//redux
import { connect } from "react-redux";
import { getAccessPage, fetchCurrentUser } from "../../redux/actions";
import { setLoading, setUnloading } from "./../../redux/actions/global";
import {
  fetchProfiles,
  fetchUser,
  updateUserInfo,
  createUser,
  setSelectedProfile,
  makeUserInvisible,
  fetchTerminales,
} from "./../../redux/actions/usuarios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Usuario = (props) => {
  let formValidated = false;
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const validateForm = ({ nombre, usuario, password, passwordMatch }) => {
    if (params.id && params.id == "new") {
      //si se esta creando uno nuevo
      formValidated =
        nombre && usuario && password && passwordMatch ? true : false;
    } else {
      //se esta actualizando
      formValidated = nombre && usuario ? true : false;
    }
    console.log(formValidated);
  };

  const required = (value) => (value ? undefined : "Este campo es requerido");

  const doSubmit = async ({
    nombre,
    usuario,
    password,
    passwordMatch,
    terminalId,
  }) => {
    props.setLoading();
    let params = { id: "" };
    const { perfilSelected, match } = props;
    params = props.match ? { ...props.match.params } : { id: "new" };

    console.log("Params: ", params);
    if (params.id == "new") {
      if (password !== passwordMatch) {
        props.setUnloading();
        toast.error("Las contraseñas no coinciden.");
        return;
      }
      //console.log("entra en new");
      await props.createUser(
        nombre,
        usuario,
        password,
        perfilSelected,
        terminalId
      );
    } else {
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

  const obtieneUsuario = async (usuarioId) => {
    await props.fetchUser(usuarioId);
  };

  const obtienePerfiles = async () => {
    await props.fetchProfiles();
  };

  const handleChangeProfile = (perfilSelected) => {
    props.setSelectedProfile(perfilSelected);
  };

  useEffect(() => {
    document.title = "SGDC - Usuario";
    const { match, getAccessPage, fetchTerminales } = props;
    getAccessPage();
    obtienePerfiles();
    fetchTerminales();

    if (props.match && props.match.params.id !== "new") {
      const { params } = match;
      obtieneUsuario(params.id);
    }
    props.setUnloading();
  }, []);

  const deleteUser = () => {
    setIsOpenDialog(true);
  };

  const onConfirmdeleteUser = () => {
    const { match, usuario } = props;
    const { params } = match;

    //comporbar si usuario actual es que esta siendo dado de baja y cerrar sesion

    if (parseInt(props.auth.userData.id) === parseInt(params.id)) {
      //cerrar sesion
      props.makeUserInvisible(params.id, true);
    } else {
      //se dio de baja y regresar a listado usuario
      console.log("Se ha dado de baja el usuario");
      props.makeUserInvisible(params.id, false);
    }
  };

  let params = {};

  if (props.match && props.match.params.id !== "new") {
    params = props.match.params;
  }

  const { usuario, isLoading, perfilSelected } = props;
  console.log(usuario);

  return isLoading ? (
    <Loading label="Cargando Usuario..." />
  ) : (
    <Grid2 container sx={{ p: 3 }}>
      <Dialog onClose={() => null} open={isOpenDialog}>
        <DialogTitle>
          <Typography
            variant="title"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {`¿Realmente desea dar de baja a ${usuario.nombre}?`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid2 container>
            <Grid2 md={12} xs={12} sx={{ textAlign: "center" }}>
              <PersonRemoveIcon sx={{ fontSize: 100 }} color="secondary" />
            </Grid2>
            <Grid2 md={12} xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body" component="div" color="secondary">
                Esta acción NO puede deshacerse una vez realizada.
              </Typography>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button
            color="neutro"
            variant="outlined"
            onClick={() => setIsOpenDialog(false)}
            autoFocus
          >
            No
          </Button>

          <Button
            color="secondary"
            variant="outlined"
            onClick={() => onConfirmdeleteUser()}
          >
            Sí, dar de baja
          </Button>
        </DialogActions>
      </Dialog>
      <Grid2 xs={10} md={12}>
        {params.id && params.id !== "new" ? (
          props.auth.userData.perfil.id === 2 ? (
            <Typography component="div" variant="h5">
              Actualización de Usuario
            </Typography>
          ) : (
            <Typography component="div" variant="h5">
              Actualización de Usuario
            </Typography>
          )
        ) : null}
      </Grid2>

      <Grid2 xs={12} md={12}>
        <Divider>Datos personales</Divider>
        <Form
          onSubmit={doSubmit}
          initialValues={usuario}
          validate={(values) => validateForm(values)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={2} sx={{ padding: 3, margin: 0 }}>
                <Grid2 xs={12} md={4}>
                  <Field name="nombre" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Nombres"
                        variant="outlined"
                        color="secondary"
                        helperText={
                          meta.error &&
                          meta.touched && (
                            <small style={{ color: "red" }}>
                              Debe ingresar nombre de pila
                            </small>
                          )
                        }
                        {...input}
                      />
                    )}
                  </Field>
                </Grid2>
                <Grid2 xs={12} md={4}>
                  <Field name="usuario" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Usuario"
                        variant="outlined"
                        color="secondary"
                        disabled={
                          params.id && params.id !== "new" ? true : false
                        }
                        helperText={
                          meta.error &&
                          meta.touched && (
                            <small style={{ color: "red" }}>
                              Debe ingresar nombre de usuario
                            </small>
                          )
                        }
                        {...input}
                      />
                    )}
                  </Field>
                </Grid2>
                <Grid2 xs={12} md={4}>
                  {params.id && params.id !== "new" ? (
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
                            disabled={
                              props.auth && props.auth.userData.perfil.id > 2
                            }
                            onChange={input.onChange}
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
                  ) : (
                    <Field name="terminalId" validate={required}>
                      {({ input, meta }) => (
                        <FormControl fullWidth>
                          <InputLabel id="terminal-label">Terminal</InputLabel>
                          <Select
                            name="terminalId"
                            color="secondary"
                            labelId="terminal-label"
                            id="terminal"
                            label="Terminal"
                            disabled={
                              params.id && params.id !== "new" ? true : false
                            }
                            helpertext={
                              meta.error && meta.touched ? (
                                <small style={{ color: "red" }}>
                                  Debe asignarle un terminal al usuario
                                </small>
                              ) : undefined
                            }
                            onChange={input.onChange}
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
                  )}
                </Grid2>
                <Grid2 xs={12} md={4}>
                  <Field
                    name="password"
                    validate={
                      params.id && params.id !== "new" ? undefined : required
                    }
                  >
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        inputProps={{ type: "password" }}
                        helperText={
                          meta.error && meta.touched ? (
                            <small style={{ color: "red" }}>
                              Debe ingresar una contraseña válida
                            </small>
                          ) : undefined
                        }
                        {...input}
                      />
                    )}
                  </Field>
                </Grid2>

                <Grid2 xs={12} md={4}>
                  <Field
                    name="passwordMatch"
                    validate={
                      params.id && params.id !== "new" ? undefined : required
                    }
                  >
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Repita su password"
                        variant="outlined"
                        color="secondary"
                        inputProps={{ type: "password" }}
                        helperText={
                          meta.error && meta.touched ? (
                            <small style={{ color: "red" }}>
                              Debe reingresar la contraseña
                            </small>
                          ) : undefined
                        }
                        {...input}
                      />
                    )}
                  </Field>
                </Grid2>
              </Grid2>
              {props.auth.userData.perfilId === 1 ? (
                <Grid2 xs={12} md={12}>
                  <Divider>Perfil de usuario</Divider>
                  <Grid2 container justifyContent="center">
                    <Grid2>
                      <SelectedProfileListItem
                        onChange={handleChangeProfile}
                        perfilSelected={perfilSelected ? perfilSelected : 3}
                      />
                    </Grid2>
                  </Grid2>
                </Grid2>
              ) : null}

              <Grid2 xs={12} md={12}>
                <Grid2 container spacing={3} sx={{ p: 3 }}>
                  {params.id && params.id !== "new" ? (
                    <Grid2 xs={12} md={2}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        startIcon={<PublishedWithChangesIcon />}
                      >
                        Actualizar
                      </Button>
                    </Grid2>
                  ) : (
                    <Grid2 xs={12} md={2}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        disabled={!formValidated}
                        startIcon={<CheckIcon />}
                      >
                        Crear Usuario
                      </Button>
                    </Grid2>
                  )}
                  {params.id && params.id !== "new" ? (
                    <>
                      <Grid2 xs={4} md={2}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          fullWidth
                          style={{ marginLeft: 10 }}
                          onClick={() => deleteUser()}
                          startIcon={<PersonRemoveIcon />}
                        >
                          Dar de baja
                        </Button>
                      </Grid2>
                      <Grid2 xs={4} md={2}>
                        <Link
                          to={`/usuarios`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            startIcon={<ArrowBackIcon />}
                          >
                            Cancelar
                          </Button>
                        </Link>
                      </Grid2>
                    </>
                  ) : null}
                </Grid2>
              </Grid2>
            </form>
          )}
        />
      </Grid2>
    </Grid2>
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
  fetchCurrentUser,
  updateUserInfo,
  createUser,
  setSelectedProfile,
  getAccessPage,
  makeUserInvisible,
  fetchTerminales,
})(Usuario);

{
  /* <TextField
                        fullWidth
                        label="Terminal"
                        variant="outlined"
                        color="secondary"
                        disabled
                        value={
                          _.find(props.terminales, { id: usuario.terminalId })
                            ? _.find(props.terminales, {
                                id: usuario.terminalId,
                              }).nombre
                            : ""
                        }
                        helperText="Para cambiar el terminal asignado, contacte al administrador del sistema."
                      /> */
}
