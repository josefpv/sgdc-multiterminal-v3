import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import withStyles from "@mui/styles/withStyles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import STPLogo from "./../../images/logo.svg";
import { toast } from "react-toastify";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//redux
import { connect } from "react-redux";
import { requestUser } from "./../../redux/actions/usuarios";
//redux form
import { Form, Field } from "react-final-form";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchTerminales } from "./../../redux/actions/usuarios";

const NewAccess = (props) => {
  let formData = {
    usuario: "",
    nombres: "",
    apellidos: "",
    password: "",
    terminal: 1,
    repetirPassword: "",
    validated: false,
  };

  useEffect(() => {
    props.fetchTerminales();
  }, []);

  const renderAutoUserText = () => {
    if (formData.usuario) {
      return (
        <>
          <Typography variant="body2" component="div">
            Tu nuevo usuario será:
          </Typography>
          <Typography component="div" variant="h3">
            <ArrowRightIcon color="secondary" sx={{ fontSize: 40 }} />{" "}
            {formData.usuario}
          </Typography>
        </>
      );
    }

    return (
      <p>Ingrese sus nombres y apellidos para generar el nombre de usuario</p>
    );
  };

  const doSubmit = async ({
    apellidos,
    nombres,
    password,
    repetirPassword,
    terminal,
    usuario,
    validated,
  }) => {
    if (password !== repetirPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const splitNombre = nombres.split(" ");
    for (let i = 0; i < splitNombre.length; i++) {
      splitNombre[i] =
        splitNombre[i][0].toUpperCase() + splitNombre[i].substr(1);
    }

    const splitApellido = apellidos.split(" ");
    for (let i = 0; i < splitApellido.length; i++) {
      splitApellido[i] =
        splitApellido[i][0].toUpperCase() + splitApellido[i].substr(1);
    }

    const nombreRegistro = `${splitNombre.join(" ")} ${splitApellido.join(
      " "
    )}`;

    await props.requestUser(
      nombreRegistro,
      formData.usuario,
      password,
      3,
      terminal
    );
  };

  const doValidate = ({
    nombres,
    apellidos,
    password,
    repetirPassword,
    terminal,
  }) => {
    formData.validated =
      nombres && apellidos && password && repetirPassword && terminal
        ? true
        : false;

    if (nombres && apellidos) {
      const letraNombre = nombres.split(" ")[0].charAt(0).toLowerCase();
      const primerApellido = apellidos
        .split(" ")[0]
        .replace(/[&\/\\#,+()$~%.'":*?<>{}ñ]/g, "")
        .toLowerCase();
      const segundoApellido =
        apellidos.split(" ").length > 1
          ? apellidos
              .split(" ")[1]
              .replace(/[&\/\\#,+()$~%.'":*?<>{}ñ]/g, "")
              .toLowerCase()
          : "";
      const usuarioFinal = `${letraNombre}${primerApellido}${
        segundoApellido[0] ? segundoApellido[0] : ""
      }`;
      //console.log("Se creare con: ", usuarioFinal);
      formData.usuario = usuarioFinal;
    }
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid2 xs={12} md={12} sx={{ textAlign: "center", paddingTop: 10 }}>
        <img src={STPLogo} height={100} />
      </Grid2>
      <Grid2 xs={12} md={12} sx={{ paddingTop: 2 }}>
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          Solicitar Acceso
        </Typography>
      </Grid2>
      <Grid2 xs={12} md={12} sx={{ paddingTop: 2 }}>
        <Typography
          variant="button"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Nuevo bombero
        </Typography>
      </Grid2>
      <Form
        onSubmit={doSubmit}
        initialValues={{ ...formData }}
        validate={(data) => doValidate(data)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid2 container spacing={3} sx={{ p: 3 }} justifyContent="center">
              <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
                {renderAutoUserText()}
              </Grid2>

              <Grid2 xs={6} md={6}>
                <Field name="nombres">
                  {(props) => (
                    <TextField
                      label="Nombres"
                      color="secondary"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      variant="outlined"
                      id="custom-css-outlined-input"
                      fullWidth
                    />
                  )}
                </Field>
              </Grid2>

              <Grid2 xs={6} md={6}>
                <Field name="apellidos">
                  {(props) => (
                    <TextField
                      label="Apellidos"
                      color="secondary"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      variant="outlined"
                      id="custom-css-outlined-input"
                      fullWidth
                    />
                  )}
                </Field>
              </Grid2>

              <Grid2 xs={6} md={6}>
                <Field name="password" type="password">
                  {(props) => (
                    <TextField
                      label="Contraseña"
                      color="secondary"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      variant="outlined"
                      id="custom-css-outlined-input"
                      type={props.input.type}
                      fullWidth
                    />
                  )}
                </Field>
              </Grid2>

              <Grid2 xs={6} md={6}>
                <Field name="repetirPassword" type="password">
                  {(props) => (
                    <TextField
                      label="Repita Contraseña"
                      color="secondary"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      variant="outlined"
                      id="custom-css-outlined-input"
                      type={props.input.type}
                      fullWidth
                    />
                  )}
                </Field>
              </Grid2>
              <Grid2 xs={12} md={12}>
                <Field name="terminal">
                  {({ input, meta }) => (
                    <FormControl fullWidth>
                      <InputLabel id="terminal-label">Terminal</InputLabel>
                      <Select
                        name={input.name}
                        color="secondary"
                        labelId="terminal-label"
                        id="terminal"
                        label="Terminal"
                        value={input.value}
                        onChange={input.onChange}
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

              <Grid2 xs={12} md={12}>
                <Alert severity="info">
                  Al solicitar acceso, su usuario estará a la espera de ser
                  activado por un supervisor y posterior a eso podrá iniciar
                  sesión.
                </Alert>
              </Grid2>
              <Grid2 xs={2} md={2} sx={{ paddingTop: 4 }}>
                <Button
                  fullWidth
                  type="submit"
                  color="secondary"
                  variant="outlined"
                  disabled={!formData.validated}
                  startIcon={<ScheduleSendIcon />}
                >
                  Solicitar Acesso
                </Button>
              </Grid2>
              <Grid2 xs={2} md={2} sx={{ paddingTop: 4 }}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                  >
                    Regresar
                  </Button>
                </Link>
              </Grid2>
            </Grid2>
          </form>
        )}
      ></Form>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    terminales: state.usuarios.terminales,
  };
};

export default connect(mapStateToProps, { requestUser, fetchTerminales })(
  NewAccess
);
