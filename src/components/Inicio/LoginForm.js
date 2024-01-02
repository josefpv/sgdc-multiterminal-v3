import React from "react";
import selloSTP from "./../../images/sello-stp_white_logo.png";
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import withStyles from "@mui/styles/withStyles";
import STPLogo from "./../../images/logo.svg";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
//redux
import { connect } from "react-redux";
import { signIn } from "../../redux/actions";
//redux form
import { Form, Field } from "react-final-form";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "white",
        borderColor: "white",
      },
      "&:hover fieldset": {
        color: "white",
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
        color: "white",
      },
    },
  },
})(TextField);

const LoginForm = ({ signIn, auth }) => {
  let formData = {
    usuario: "",
    password: "",
    validated: false,
  };

  const doSubmit = async ({ usuario, password }) => {
    await signIn(usuario, password);
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      sx={{ height: "100%" }}
      spacing={3}
    >
      <Form
        onSubmit={doSubmit}
        initialValues={{ ...formData }}
        validate={({ usuario, password }) =>
          (formData.validated = usuario && password ? true : false)
        }
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{ width: "70%" }}
          >
            <Grid2 md={12} sx={{ textAlign: "center" }}>
              <img src={STPLogo} height={100} />
            </Grid2>
            <Grid2 md={12} style={{ textAlign: "center" }}>
              <Typography component="h2" variant="h2">
                SGDC - Eléctricos
              </Typography>
              <Typography component="p" variant="subtitle1">
                Inicie sesión para comenzar a usar el sistema
              </Typography>
            </Grid2>
            <Grid2 md={12}>
              <Field name="usuario">
                {(props) => (
                  <TextField
                    label="Usuario"
                    variant="outlined"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    id="input-usuario"
                    color="secondary"
                    fullWidth
                  />
                )}
              </Field>
            </Grid2>
            <Grid2 md={12}>
              <Field name="password" type="password">
                {(props) => (
                  <TextField
                    label="Password"
                    variant="outlined"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    id="input-password"
                    color="secondary"
                    type={"password"}
                    fullWidth
                  />
                )}
              </Field>
            </Grid2>
            <Grid2 md={12}>
              <LoadingButton
                variant="outlined"
                color="secondary"
                fullWidth
                loading={auth.isLoadingBtn}
                disabled={!formData.validated}
                type="submit"
              >
                Iniciar Sesión
              </LoadingButton>
            </Grid2>
          </form>
        )}
      />
      <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
        <Link
          style={{ color: "#f30f0f", textDecoration: "none" }}
          to="/nuevoacceso"
        >
          <PersonAddIcon /> Solicitar Acceso
        </Link>
      </Grid2>
      {/* <div className="col" style={{ paddingTop: 14 }}>
       
      </div> */}
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signIn })(LoginForm);
