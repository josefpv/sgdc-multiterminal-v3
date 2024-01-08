import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Tab,
  Tabs,
  Divider,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DiscFullIcon from "@mui/icons-material/DiscFull";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SliderRange from "../common/slider";
import { toast } from "react-toastify";
import ErroresDetencion from "../common/erroresDetencion";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import SeleccionDerivacion from "../common/SeleccionDerivacion";
import MasDetallePuesto from "./MasDetallePuesto";
import _ from "lodash";
import {
  makeDerivacion,
  setSelectedDerivacion,
} from "../../redux/actions/derivacion";
import {
  handleIniciaCarga,
  handleDetieneCarga,
  reservaNuevamente,
  handelDetieneCargaInterna,
  handleAccionaTecle,
} from "./../../redux/actions/cargas";
import ModalDialog from "../common/ModalDialog";

const setProgressColor = (estado) => {
  //disponilbe (1) => verde
  if (estado === 1) {
    return {
      color: "#32b343",
    };
  }
  //camino a estacionar "reservado" (2) => amarillo
  if (estado === 2 || estado === 7) {
    return {
      color: "#f0c818",
    };
  }
  //cargando (3) => azul
  if (estado === 3) {
    return {
      color: "#03428a",
    };
  }
  //ocuapdo pero con carga finalizada (4)=> rojo
  if (estado === 4) {
    return {
      color: "#cc1d02",
    };
  }
  //no existe (5) => gris
  if (estado === 5) {
    return {
      color: "#fc9235",
    };
  }
  //operativo
  if (estado === 6) {
    return {
      color: "#ba34eb",
    };
  }
  //ocupado sin conectar
  //???????????
  //deshabilitado (0)=> naranaja
  if (estado === 0) {
    return {
      color: "#e07400",
    };
  }

  return {
    color: "#32b343",
  };
};

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        color="primary"
        size={props.size}
        value={props.value}
        sx={{
          "& .MuiCircularProgress-circle": setProgressColor(props.estado),
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontSize: isMobile ? 30 : 60 }}
          color="text.secondary"
        >
          {props.estado === 3
            ? `${Math.round(props.value)}%`
            : getEstadoString(props.estado)}
        </Typography>
        {!isMobile && (
          <Box
            sx={{
              left: 0,
              bottom: 100,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                border: "none",
                color: "#000000",
                fontSize: isMobile ? 10 : 14,
              }}
              variant="outlined"
              endIcon={<CloudSyncIcon sx={{ fontSize: isMobile ? 40 : 20 }} />}
              onClick={() =>
                props.onSyncPress(
                  props.data.cargadorOrigen.id,
                  props.data.marquesina.id,
                  props.data.puesto.id,
                  props.data.puesto.nombre
                )
              }
              disabled={props.estado != 2 ? true : false}
            >
              Sincronizar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const getEstadoString = (estadoID) => {
  if (estadoID === 1) return "Disponible";
  if (estadoID === 2) return "Reservado";
  if (estadoID === 3) return "Cargando";
  if (estadoID === 4) return "Ocupado";
  if (estadoID === 5) return "Inhabilitado";
  if (estadoID === 6) return "Operativo";
  if (estadoID === 7) return "Iniciando...";
  if (estadoID === 0) return "No Existe";
};
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const DetallePuesto = ({
  auth,
  buses,
  showModal,
  origen,
  data,
  topButtons,
  isLoadingBtn,
  isBtnAppLocked,
  perfilIdUsuario,
  handleAccionaTecle,
  handleIniciaCarga,
  handleDetieneCarga,
  handelDetieneCargaInterna,
  reservaNuevamente,
  onLiberaPuesto,
  onSetPuestoOperativo,
  onSync,
  onReservaNuevamente,
  setSelectedDerivacion,
  selectedDerivacion,
  makeDerivacion,
  children,
}) => {
  const [estadoPistola, setEstadoPistola] = useState(0);
  const [tiempoTecle, setTiempoTecle] = useState(25);
  const [valueRange, setValueRange] = useState(false);
  const [isReservaNuevamente, setIsReservaNuevamente] = useState(false);
  const [isOperativo, setIsOperativo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("0");
  const [opneDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let derivacionId = 1;
    const datosValidos =
      Object.keys(data).length &&
      Object.keys(data.puesto).length &&
      Object.keys(buses).length &&
      data.puesto.bus.ppu
        ? true
        : false;

    if (datosValidos) {
      const bus = _.filter(buses, {
        ppu: data.puesto.bus.ppu,
      });

      derivacionId = bus.derivacionTipoId ? bus.derivacionTipoId : 1;
    }

    setSelectedDerivacion(derivacionId);
  }, []);

  const handleConfirmDerivacion = () => {
    const { ppu } = data.puesto.bus;
    console.log("se hace derivacion", selectedDerivacion);
    makeDerivacion(ppu, selectedDerivacion);
    setSelectedDerivacion(selectedDerivacion);
    setOpenDialog(false);
  };

  const handleTiempoTecle = (tiempoTecle) => {
    setTiempoTecle(tiempoTecle);
    setValueRange(true);
  };

  const handleAccionPistola = (accion) => {
    let tiempoCarga = 30000;
    const { energiaCarga } = data.puesto;
    if (accion === 2) tiempoCarga = 40000;

    setIsLoading(true);

    if (accion === 0 || accion === 1) {
      if (parseInt(energiaCarga, 10) > 0) {
        //el cargador esta en uso
        toast.error(
          "El cargador se encuentra en uso, por favor finalice la carga antes de accionar la pistola."
        );
        setIsLoading(false);
        return;
      }
    }

    let mensajeAlerta = "";
    switch (accion) {
      case 1:
        mensajeAlerta = "subir tecle";
        break;
      case 2:
        mensajeAlerta = "bajar tecle";
        break;
      default:
        break;
    }

    if (confirm(`¿Desea ${mensajeAlerta} ?`)) {
      let tiempoTecleFinal = 0;
      if (valueRange) {
        tiempoTecleFinal = tiempoTecle;
      } else {
        tiempoTecleFinal = data.puesto.tiempo;
      }

      console.info("Se accionara tecle a: ", tiempoTecleFinal);
      handleAccionaTecle(
        data.cargadorOrigen.id,
        data.puesto.id,
        accion,
        tiempoTecleFinal
      );
    }
    setTimeout(() => {
      setIsLoading(false);
    }, tiempoCarga);
  };

  const handleLiberaPuesto = () => {
    //setIsFree((prev) => !prev);
    onLiberaPuesto(data);
  };

  const handleSeleccionError = (errorId, socket) => {
    //onLiberaPuesto(data, errorId, socket);
    if (isReservaNuevamente) {
      reservaNuevamente(data, errorId, socket);
    } else {
      onSetPuestoOperativo(data, errorId, socket);
    }

    setIsReservaNuevamente(false);
    setIsOperativo(false);
  };

  const handleOperativoPuesto = () => {
    //onSetPuestoOperativo(data);
    setIsOperativo((prev) => !prev);
  };

  const handleSync = (cargadorId, marquesinaId, puestoId, puestoNombre) => {
    onSync(cargadorId, marquesinaId, puestoId, puestoNombre);
  };

  const handleReservaNuevamente = () => {
    setIsReservaNuevamente((prev) => !prev);
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseModalConfirmation = () => {
    setOpenDialog(false);
  };

  const onIniciaCarga = () => {
    if (confirm(`¿Desea iniciar carga en pistola ${data.puesto.nombre}`)) {
      const marquesinaId = data.marquesina.id;
      const cargadorId = data.cargadorOrigen.id;
      const pistolaId = data.puesto.id;
      handleIniciaCarga(marquesinaId, cargadorId, pistolaId);
      toast.info(
        `Se ha enviado inicio de carga para ${data.puesto.nombre}, a la espera de confirmación por servicio.`
      );
    }
  };

  const onDetieneCarga = () => {
    if (confirm(`¿Desea detener la carga en pistola ${data.puesto.nombre}`)) {
      const marquesinaId = data.marquesina.id;
      const cargadorId = data.cargadorOrigen.id;
      const pistolaId = data.puesto.id;
      handleDetieneCarga(marquesinaId, cargadorId, pistolaId);
    }
  };

  const onDetencionInterna = () => {
    if (
      confirm(
        `¿Desea detener internamente la carga en pistola ${data.puesto.nombre}`
      )
    ) {
      const marquesinaId = data.marquesina.id;
      const cargadorId = data.cargadorOrigen.id;
      const pistolaId = data.puesto.id;
      handelDetieneCargaInterna(marquesinaId, cargadorId, pistolaId);
    }
  };

  if (origen === "cargas" && data && data.puesto) {
    //mostrar cuando se clickea desde cargas
    return (
      <Grid2
        container
        spacing={2}
        sx={{ p: 4, minHeight: "579px" }}
        justifyContent="center"
        alignItems="center"
      >
        <ModalDialog
          open={opneDialog}
          title="Actualizar Derivación"
          content={`¿Seguro que desea derivar el bus ${data.puesto.bus.ppu}?`}
          onClose={handleCloseModalConfirmation}
          onConfirm={handleConfirmDerivacion}
          onCancel={handleCloseModalConfirmation}
          icon={<CallSplitIcon sx={{ fontSize: 60 }} color="secondary" />}
        />
        <Grid2 xs={12}>
          <Typography
            sx={{
              ...setProgressColor(data.puesto.estado),
              fontSize: 40,
              width: "100%",
              height: "100%",
              textAlign: "center",
            }}
            component="div"
            variant="h3"
          >
            {`Pistola ${data.puesto.nombre} (${data.cargadorOrigen.nombre})`}
            {/* {data.puesto && data.puesto.estado === 2 && topButtons ? (
              <IconButton
                aria-label="subidaMasiva"
                color="secondary"
                title="Sincronizar"
                onClick={() =>
                  onSync(
                    data.cargadorOrigen.id,
                    data.marquesina.id,
                    data.puesto.id,
                    data.puesto.nombre
                  )
                }
                size="large"
              >
                <SyncIcon sx={{ fontSize: 40 }} />
              </IconButton>
            ) : null} */}
          </Typography>
          <Divider />
        </Grid2>

        <Grid2 xs={12} md={5} sx={{ textAlign: "center" }}>
          <CircularProgressWithLabel
            size={isMobile ? 200 : 380}
            value={data.puesto.estado === 3 ? parseInt(data.puesto.soc) : 100}
            estado={data.puesto.estado}
            onSyncPress={handleSync}
            data={data}
          />
          {isMobile && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  border: "none",
                  width: "100%",
                  color: "#000000",
                  fontSize: isMobile ? 10 : 14,
                }}
                variant="outlined"
                endIcon={
                  <CloudSyncIcon sx={{ fontSize: isMobile ? 40 : 20 }} />
                }
                onClick={() =>
                  handleSync(
                    data.cargadorOrigen.id,
                    data.marquesina.id,
                    data.puesto.id,
                    data.puesto.nombre
                  )
                }
                disabled={data.puesto.estado != 2 ? true : false}
              >
                Sincronizar
              </Button>
            </Box>
          )}
        </Grid2>
        <Grid2 xs={12} md={7}>
          <Grid2 container>
            <Grid2 xs={12} md={12}>
              <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="Acción - Derivacaión" value="0" />
                <Tab label="Más Información" value="1" />
              </Tabs>
            </Grid2>
            <Grid2 xs={12} md={12}>
              <TabPanel value={activeTab} index="0">
                {data.puesto.estado !== 1 && data.puesto.estado !== 5 && (
                  <Grid2 container>
                    <Grid2 xs={12} md={6}>
                      <SeleccionDerivacion color="secondary" />
                    </Grid2>
                    <Grid2 xs={12} md={6} sx={{ pt: 2 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<CallSplitIcon />}
                        fullWidth
                        sx={{ height: "90%" }}
                        onClick={() => setOpenDialog(true)}
                      >
                        Confirmar Derivación
                      </Button>
                    </Grid2>
                  </Grid2>
                )}
                <Grid2 xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed grey",
                      textAlign: "center",
                    }}
                  >
                    <Typography component="div" variant="caption">
                      Tiempo acción tecle
                    </Typography>
                    <SliderRange
                      onTiempoTecle={handleTiempoTecle}
                      tiempo={data.puesto.tiempo}
                      estadoCargador={data.puesto.estado}
                    />
                  </Box>
                </Grid2>
                <Grid2 xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed grey",
                      textAlign: "center",
                    }}
                  >
                    {isLoadingBtn ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <Grid2 container spacing={2}>
                        <Grid2 xs={6}>
                          {data.puesto.pistolaTecleActivo ? (
                            <Button
                              onClick={() => handleAccionPistola(2)}
                              color="secondary"
                              variant="outlined"
                              endIcon={<ArrowDownwardIcon />}
                              fullWidth
                              disabled={perfilIdUsuario == 7 ? true : false}
                            >
                              Tecle
                            </Button>
                          ) : null}
                        </Grid2>
                        <Grid2 xs={6}>
                          {data.puesto.pistolaTecleActivo ? (
                            <Button
                              onClick={() => handleAccionPistola(1)}
                              color="secondary"
                              variant="outlined"
                              endIcon={<ArrowUpwardIcon />}
                              fullWidth
                              disabled={perfilIdUsuario == 7 ? true : false}
                            >
                              Tecle
                            </Button>
                          ) : null}
                        </Grid2>
                        <Grid2 xs={6}>
                          <Button
                            color="secondary"
                            variant="outlined"
                            endIcon={<PlayArrowIcon />}
                            fullWidth
                            onClick={() => {
                              !isBtnAppLocked
                                ? onIniciaCarga()
                                : toast.error(
                                    "No esta permitido realizar cargas dentro del horario actual."
                                  );
                            }}
                            disabled={
                              isBtnAppLocked ||
                              perfilIdUsuario == 7 ||
                              data.puesto.estado != 2
                                ? true
                                : false
                            }
                          >
                            Iniciar
                          </Button>
                        </Grid2>
                        {data.puesto.estado === 3 ? (
                          <Grid2 xs={6}>
                            <ButtonGroup
                              fullWidth
                              variant="outlined"
                              aria-label="outlined button group"
                            >
                              <Button
                                sx={{ fontSize: isMobile ? 9 : 11 }}
                                color="secondary"
                                variant="outlined"
                                endIcon={<StopIcon />}
                                fullWidth
                                onClick={() => onDetieneCarga()}
                                disabled={perfilIdUsuario == 7 ? true : false}
                              >
                                Detener
                              </Button>
                              <Button
                                sx={{ fontSize: isMobile ? 8 : 11 }}
                                color="secondary"
                                variant="outlined"
                                endIcon={<DiscFullIcon />}
                                fullWidth
                                onClick={() => onDetencionInterna()}
                                disabled={perfilIdUsuario == 7 ? true : false}
                              >
                                Detener Interno
                              </Button>
                            </ButtonGroup>
                          </Grid2>
                        ) : (
                          <Grid2 xs={6}>
                            <Button
                              sx={{ fontSize: isMobile ? 8 : 11 }}
                              color="secondary"
                              variant="outlined"
                              endIcon={<StopIcon />}
                              fullWidth
                              onClick={() => onDetieneCarga()}
                              disabled={perfilIdUsuario == 7 ? true : false}
                            >
                              Detener
                            </Button>
                          </Grid2>
                        )}
                        {/*Si puesto esta ocupado u operativo */}
                        {data.puesto.estado === 4 ||
                        data.puesto.estado === 6 ? (
                          <>
                            {
                              //si puesto esta como ocupado da opcion de operativo
                              data.puesto.estado === 4 && (
                                <>
                                  <Grid2 xs={6}>
                                    <Button
                                      color="secondary"
                                      variant="outlined"
                                      endIcon={<RefreshIcon />}
                                      fullWidth
                                      onClick={() => handleReservaNuevamente()}
                                      disabled={
                                        perfilIdUsuario == 7 ? true : false
                                      }
                                    >
                                      Reservar nuevamente
                                    </Button>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      align="left"
                                      gutterBottom
                                      sx={{ color: "#909091", fontWeight: 1 }}
                                    >
                                      Se recomienda hacer cambio de socket.
                                    </Typography>
                                  </Grid2>
                                  <Grid2 xs={6}>
                                    <Button
                                      color="secondary"
                                      variant="outlined"
                                      endIcon={<DoneAllIcon />}
                                      fullWidth
                                      onClick={handleOperativoPuesto}
                                    >
                                      Operativo
                                    </Button>
                                  </Grid2>
                                </>
                              )
                            }

                            {
                              //si puesto esta operativo da opcion para liberar
                              data.puesto.estado === 6 && (
                                <Grid2 xs={12}>
                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    endIcon={<ArrowOutwardIcon />}
                                    fullWidth
                                    onClick={handleLiberaPuesto}
                                  >
                                    Liberar puesto
                                  </Button>{" "}
                                </Grid2>
                              )
                            }

                            {isReservaNuevamente || isOperativo ? (
                              <ErroresDetencion
                                onSeleccionError={handleSeleccionError}
                              />
                            ) : null}
                          </>
                        ) : null}
                      </Grid2>
                    )}
                  </Box>
                </Grid2>
              </TabPanel>
              <TabPanel value={activeTab} index="1">
                <Grid2 xs={12} md={12}>
                  <MasDetallePuesto data={data} />
                </Grid2>
              </TabPanel>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 md={12} xs={12}>
          {children}
        </Grid2>
      </Grid2>
    );
  } else if (origen === "semaforo") {
    //mostrar en caso de clickear desde semaforo
  } else {
    return <Typography>Nada por aqui</Typography>;
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    buses: state.buses.buses,
    showModal: state.cargas.modalData.showModal,
    data: state.cargas.modalData.data,
    isBtnAppLocked: state.global.isAppLocked,
    isLoadingBtn: state.cargas.modalData.isLoadingBtn,
    perfilIdUsuario: state.auth.userData.perfil.id,
    selectedDerivacion: state.derivacion.selectedDerivacion,
  };
};

export default connect(mapStateToProps, {
  handleAccionaTecle,
  handleIniciaCarga,
  handleDetieneCarga,
  handelDetieneCargaInterna,
  reservaNuevamente,
  setSelectedDerivacion,
  makeDerivacion,
})(DetallePuesto);
