import {
  FETCH_INNER_STATE_CHARGERS,
  UPDATE_INNER_STATE_CHARGERS,
  FETCH_MARQUESINAS,
  UPDATE_MARQUESINAS_MANUALLY,
  SET_INTERVAL_FETCH_MARQUESINAS,
  UNSET_INTERVAL_FETCH_MARQUESINAS,
  SET_MODAL_DATA,
  UNSET_MODAL_DATA,
  UPDATE_MODAL_DATA,
  TOGGLE_BTN_MODAL,
  GET_STATUS_CONNECTOR,
  GET_STATUS_CONNECTOR_ALL,
  HANDLE_TECLE,
  HANDLE_TECLE_TIME,
  HANDLE_ALL_TECLES,
  STOP_CARGE_INTERNALLY,
  SET_CHARGER_FREE,
  HANDLE_SYNC,
  MAKE_RESERVA,
  STOP_CHARGER_ON_FAILURE,
  STOP_PENDING_CHARGINGS,
  HANDLE_INSPECT_CHARGER,
  CHANGE_CHARGER_STATUS,
  FETCH_BUSES_RESUME,
  REINICIO_FORZADO,
} from "./types";
import history from "./../../history";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";
//Estados Internos
import { obtieneCargadoresEstados } from "./../../components/services/cargadoresEstado";

//Cargas Bomberos
export const fetchMarquesinas = () => async (dispatch) => {
  const terminalId = localStorage.getItem("terminalId");
  const url = `${config.endPoints.consultaCargadores}${terminalId}`;
  const { data } = await http.get(url);

  !data.completado &&
    toast.error(
      "No se ha podido cargar las marquesinas, por favor intente nuevamente actualizando la página."
    );

  if (terminalId == 1) {
    let payload = [];
    let marquesina1 = [];
    let marquesina2 = [];
    let marquesina3 = [];
    let marquesina4 = [];

    //marquesina A
    const cm1 = data.marquesinas[0].cargadores;
    const cm2 = data.marquesinas[1].cargadores;
    const cm3 = data.marquesinas[2].cargadores;
    const cargadoresMarquesina1 = [...cm1, ...cm2, ...cm3];
    const copiaMarquesina1 = {
      ...data.marquesinas[0],
      cargadores: cargadoresMarquesina1,
    };

    //Marquesina B
    const cm4 = data.marquesinas[3].cargadores;
    const cm5 = data.marquesinas[4].cargadores;
    const cargadoresMarquesina2 = [...cm4, ...cm5];
    const copiaMarquesina2 = {
      ...data.marquesinas[3],
      cargadores: cargadoresMarquesina2,
    };

    //Marquesina C
    const cm6 = data.marquesinas[5].cargadores;
    const cm7 = data.marquesinas[6].cargadores;
    const cargadoresMarquesina3 = [...cm6, ...cm7];
    const copiaMarquesina3 = {
      ...data.marquesinas[5],
      cargadores: cargadoresMarquesina3,
    };

    //Marquesina D
    const cm8 = data.marquesinas[7].cargadores;
    const cm9 = data.marquesinas[8].cargadores;
    const cargadoresMarquesina4 = [...cm8, ...cm9];
    const copiaMarquesina4 = {
      ...data.marquesinas[7],
      cargadores: cargadoresMarquesina4,
    };

    payload.push(
      copiaMarquesina1,
      copiaMarquesina2,
      copiaMarquesina3,
      copiaMarquesina4
    );

    dispatch({
      type: FETCH_MARQUESINAS,
      payload,
    });
    return;
  }
  //se evalua terminal id para invertir el orden las marquesinas en terminal Las
  if (terminalId == 2) {
    //las torres
    let payload = [];
    let cargadoresInvertidos = [];

    data.marquesinas.map((m, index) => {
      cargadoresInvertidos = [];

      m.cargadores.map((c) => {
        let p1 = c.pistolas[0];
        let p2 = c.pistolas[1];
        //se invierten pistolas
        let pistolasInv = [p1, p2];
        cargadoresInvertidos.push({ ...c, pistolas: pistolasInv });
      });
      if (index == 0 || index == 2) {
        payload.push({
          ...m,
          cargadores: _.reverse(cargadoresInvertidos),
        });
      } else {
        payload.push({
          ...m,
          cargadores: cargadoresInvertidos,
        });
      }
    });

    dispatch({
      type: FETCH_MARQUESINAS,
      payload: [payload[0], payload[2], payload[1], payload[3]],
    });

    /*  dispatch({
        type: FETCH_MARQUESINAS,
        payload: [
          data.marquesinas[0],
          data.marquesinas[2],
          data.marquesinas[1],
          data.marquesinas[3],
        ],
      }); */
    return;
  }

  //se revierten argadores para los tilos
  if (terminalId == 4) {
    let payload = [];
    /* 
      data.marquesinas.map((m, index) => {
        if (index == 0) {
          payload.push({
            ...m,
            cargadores: _.reverse(m.cargadores),
          });
        } else {
          payload.push({
            ...m,
            cargadores: m.cargadores,
          });
        }
      });
  
      dispatch({
        type: FETCH_MARQUESINAS,
        payload,
      });
   */

    let cargadoresInvertidos = [];

    data.marquesinas.map((m, index) => {
      cargadoresInvertidos = [];

      m.cargadores.map((c) => {
        let p1 = c.pistolas[0];
        let p2 = c.pistolas[1];
        //se invierten pistolas
        let pistolasInv = [p2, p1];
        cargadoresInvertidos.push({ ...c, pistolas: pistolasInv });
      });
      if (index == 0) {
        payload.push({
          ...m,
          cargadores: _.reverse(cargadoresInvertidos),
        });
      } else {
        payload.push({
          ...m,
          cargadores: cargadoresInvertidos,
        });
      }
    });

    dispatch({
      type: FETCH_MARQUESINAS,
      payload,
    });

    return;
  }

  if (terminalId == 7) {
    //alvaro casanova
    //se invirtien L y R cargadores de:
    // marquesinas[1] A,
    // marquesinas[0] B
    // marquesinas[4] E
    let payload = [];
    let cargadoresInvertidos = [];

    data.marquesinas.map((m, index) => {
      cargadoresInvertidos = [];
      if (index === 0 || index === 1 || index === 4) {
        m.cargadores.map((c) => {
          let p1 = c.pistolas[0];
          let p2 = c.pistolas[1];
          //se invierten pistolas
          let pistolasInv = index == 1 ? [p1, p2] : [p2, p1];
          cargadoresInvertidos.push({ ...c, pistolas: pistolasInv });
        });
        //se invierten los cargadores en caso de ser la marquesina A
        payload.push({
          ...m,
          cargadores:
            index == 1 ? _.reverse(cargadoresInvertidos) : cargadoresInvertidos,
        });
      } else {
        payload.push(m);
      }
    });

    dispatch({
      type: FETCH_MARQUESINAS,
      payload: [
        payload[1],
        payload[0],
        payload[3],
        payload[2],
        payload[4],
        payload[5],
      ],
    });
    return;
  }
  if (terminalId == 6) {
    //camilo henriquez
    dispatch({
      type: FETCH_MARQUESINAS,
      payload: [data.marquesinas[1], data.marquesinas[0]],
    });
    return;
  }

  if (terminalId == 5) {
    //primavera
    let payload = [];
    let cargadoresInvertidos = [];

    data.marquesinas.map((m, index) => {
      cargadoresInvertidos = [];
      m.cargadores.map((c) => {
        let p1 = c.pistolas[0];
        let p2 = c.pistolas[1];
        //se invierten pistolas
        let pistolasInv = [p2, p1];
        cargadoresInvertidos.push({ ...c, pistolas: pistolasInv });
      });
      //se invierten los cargadores en caso de ser la marquesina A
      payload.push({
        ...m,
        cargadores:
          index == 2 ? _.reverse(cargadoresInvertidos) : cargadoresInvertidos,
      });
    });

    dispatch({
      type: FETCH_MARQUESINAS,
      payload,
    });
    return;
  }

  console.log(data.marquesinas);
  dispatch({
    type: FETCH_MARQUESINAS,
    payload: data.marquesinas,
  });
};

export const updateMarquesinasManually = (data) => {
  return {
    type: UPDATE_MARQUESINAS_MANUALLY,
    payload: data,
  };
};

export const setIntervalFetchMarquesinas = (intervalId) => {
  return {
    type: SET_INTERVAL_FETCH_MARQUESINAS,
    payload: intervalId,
  };
};

export const unsetIntervalFetchMarquesinas = () => {
  return {
    type: UNSET_INTERVAL_FETCH_MARQUESINAS,
    payload: 0,
  };
};

export const setDataModal =
  (puesto, marquesina, cargadorOrigen, statusCheck = null, intentos = null) =>
  async (dispatch, getState) => {
    const { isLoadingBtn } = getState().cargas.modalData;
    dispatch({
      type: SET_MODAL_DATA,
      payload: {
        data: {
          puesto: puesto,
          marquesina: marquesina,
          cargadorOrigen: cargadorOrigen,
          estadoPistola: "",
          statusCheck,
          intentos,
        },
        showModal: true,
        isLoadingBtn,
      },
    });
  };

export const unsetDataModal = () => (dispatch, getState) => {
  //Problem: button keeps loading when start charging. Fix: set loading property to false when closing modal
  dispatch({
    type: UNSET_MODAL_DATA,
    payload: { data: {}, showModal: false, isLoadingBtn: false },
  });
};

export const updateModalData = () => (dispatch, getState) => {
  console.info("Actualizando modal....");
  const { isLoadingBtn } = getState().cargas.modalData;
  const { puesto, cargadorOrigen, marquesina } =
    getState().cargas.modalData.data;
  const modalDataCopy = { ...getState().cargas.modalData.data };
  const marquesinas = getState().cargas.marquesinas;
  //busco marquesina
  const indexMarquesina = marquesinas.findIndex((m) => m.id === marquesina.id);
  //console.log("INDEX MARQUESINAL: ", indexMarquesina);
  //busco index cargador
  const indexCargador = marquesinas[indexMarquesina].cargadores.findIndex(
    (c) => c.id === cargadorOrigen.id
  );
  //console.log("INDEX CARGADOR: ", indexCargador);
  //busco index pistola
  const indexPistola = marquesinas[indexMarquesina].cargadores[
    indexCargador
  ].pistolas.findIndex((p) => p.id === puesto.id);
  //console.log("INDEX PISTOLA: ", indexPistola);
  //obtengo nuevo valor de la pistola
  const pistola = {
    ...marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
      indexPistola
    ],
  };
  //console.log("NUEVO VALOR PIS: ", pistola);
  //asigno nuevo valor de pistola a vista modal (modal data)

  modalDataCopy.puesto = pistola;
  dispatch({
    type: UPDATE_MODAL_DATA,
    payload: {
      data: modalDataCopy,
      showModal: true,
      isLoadingBtn,
    },
  });
};

export const toggleBtnModal = () => async (dispatch, getState) => {
  const { modalData } = getState().cargas;
  dispatch({
    type: TOGGLE_BTN_MODAL,
    payload: { ...modalData, isLoadingBtn: !modalData.isLoadingBtn },
  });
};

export const getStatusConnetor = (data) => async (dispatch) => {
  const { puesto, cargadorOrigen } = data;
  const cargadorNombre = cargadorOrigen.nombre;
  const pistolaNro = parseInt(puesto.nro, 10);

  console.log(puesto.nro);
  console.log(cargadorOrigen.nombre);

  const url = `${config.global}${config.endPoints.connectorStatus}?cargadorNombre=STP_${cargadorNombre}&pistolaNro=${pistolaNro}`;
  const { data } = await http.get(url);

  !data.completado &&
    toast.error(
      `Error al intentar obtener status connector de la pistola ${cargadorOrigen.nombre} ${puesto.nro}`
    );

  dispatch({
    type: GET_STATUS_CONNECTOR,
    payload: data.estados,
  });
};

export const getStatusConnectorAll = () => async (dispatch) => {
  const url = `${config.global}${config.endPoints.connectorStatusTodas}`;
  const { data } = await http.get(url);

  //console.log("Status Connector All: ", data);

  !data.completado &&
    toast.error(`Error al intentar obtener status connectors`);

  dispatch({
    type: GET_STATUS_CONNECTOR_ALL,
    payload: data.estados,
  });
};

//////// ============ CAMBIOS ====================

export const handleAccionaTecle =
  (cargadorId, pistolaId, accion, segundos) => async (dispatch, getState) => {
    const url = `${config.endPoints.accionTecle}`;
    const usuarioId = getState().auth.userData.id;
    const dataApi = { cargadorId, pistolaId, accion, segundos, usuarioId };
    const { data } = await http.post(url, dataApi);

    toast.info(data.msg);

    dispatch({
      type: HANDLE_TECLE_TIME,
    });
  };

export const handleIniciaCarga =
  (marquesinaId, cargadorId, pistolaId) => async (dispatch, getState) => {
    const url = config.endPoints.inciaCarga;
    const dataCarga = {
      marquesinaId,
      cargadorId,
      pistolaId,
      amperes: 200,
      usuarioId: getState().auth.userData.id,
    };
    http.post(url, dataCarga).then(({ data }) => {
      dispatch({
        type: HANDLE_TECLE_TIME,
      });
    });
  };

export const handleDetieneCarga =
  (marquesinaId, cargadorId, pistolaId) => async (dispatch, getState) => {
    const url = config.endPoints.detieneCarga;

    const dataStopCarga = {
      marquesinaId,
      cargadorId,
      pistolaId,
      usuarioId: getState().auth.userData.id,
    };

    http
      .post(url, dataStopCarga)
      .then(({ data }) => {
        toast.info(data.msg);
        dispatch(unsetDataModal());
        dispatch({
          type: HANDLE_TECLE_TIME,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const handelDetieneCargaInterna =
  (marquesinaId, cargadorId, pistolaId) => async (dispatch, getState) => {
    const url = `${config.endPoints.detieneCargaInterna}`;
    const dataApi = {
      marquesinaId,
      cargadorId,
      pistolaId,
      usuarioId: getState().auth.userData.id,
    };
    const { data } = await http.post(url, dataApi);
    toast.info(data.msg);
  };

export const handleAllTecles = (marquesinaId, accion) => async (dispatch) => {
  //console.log("Accion masiva ", marquesinaId, accion);

  if (
    confirm(
      "¡PRECAUCIÓN!\nEsta a punto de realizar una acción masiva en tecles, REALICE ESTA ACCIÓN SOLO SI NO HAY BUSES CONECTADOS A ESTOS NI BOMBEROS MANIPULANDO LOS TECLES. ESTA ACCIÓN NO PUEDE DETENERSE UNA VEZ EJECUTADA."
    )
  ) {
    try {
      const response = await accionMasivaTecle(marquesinaId, accion);

      if (response.completado) {
        const marquesinaNombre = ["A", "B", "C", "D"];

        accion === 1 &&
          toast.info(
            `Se ha activado la subida masiva de los tecles de la marquesina ${
              marquesinaNombre[marquesinaId - 1]
            }.`
          );
        accion === 2 &&
          toast.info(
            `Se ha activado la bajada masiva de los tecles de la marquesina ${
              marquesinaNombre[marquesinaId - 1]
            }.`
          );
      } else {
        toast.error(
          "Ha ocurrido un arror inesperado al intentar accionar los tecles, por favor intente nuevamente o contacte al administrador del servicio."
        );
      }
    } catch (error) {
      toast.error(
        "Ha ocurrido un arror inesperado al intentar accionar los tecles, por favor intente nuevamente o contacte al administrador del servicio."
      );
    }
  }

  dispatch({
    type: HANDLE_ALL_TECLES,
  });
};

export const stopChargeInternally =
  (dataModal) => async (dispatch, getState) => {
    dispatch(toggleBtnModal());
    let response = "";
    const cargadoresEstadoInternoCopy = [
      ...getState().cargas.cargadoresEstadoInterno,
    ];

    //Para reestablecer las marquesinas y data de la modal en caso de fallida la llamada
    //const copyMarquesinas = [...this.state.marquesinas];
    const dataModalOriginal = { ...getState().cargas.modalData.data };
    console.log("DATA ORIGINAL 1: ", dataModalOriginal);

    const marquesinas = [...getState().cargas.marquesinas];

    //envia comando de deterner carga
    console.log("Deteniendo carga");
    //cambio progressbar a ocupado (4)
    dataModal.puesto.estado = 4;
    //cambio cuadro de puesto a ocupado (4)
    dispatch(actualizaEstadoGrilla(4));

    dispatch(updateMarquesinasManually(marquesinas));
    const { puesto, marquesina, cargadorOrigen } = dataModal;
    dispatch(setDataModal(puesto, marquesina, cargadorOrigen));

    try {
      response = await stopCargaInterna(
        dataModal.marquesina.id,
        dataModal.cargadorOrigen.id,
        dataModal.puesto.id,
        getState().auth.userData.id
      );

      //console.log(response);
    } catch (error) {
      //se revierte
      dataModal.puesto.estado = 3;
      //cambio cuadro de puesto a cargando (3)
      dispatch(actualizaEstadoGrilla(3));
      dispatch(updateMarquesinasManually(marquesinas));
      const { puesto, marquesina, cargadorOrigen } = dataModal;
      dispatch(setDataModal(puesto, marquesina, cargadorOrigen));
      toast.error(
        "Ha ocurrido un arror inesperado, por favor intente nuevamente o contacte al administrador del servicio."
      );
    }
    console.log("RESPONSE: ", response);
    if (response.completado) {
      dispatch(toggleBtnModal());
      response.mensaje && toast.success(response.mensaje);

      dispatch(updateInnerStateChargers(cargadoresEstadoInternoCopy));
    } else {
      //revertir states
      dispatch(toggleBtnModal());
      response.mensaje && toast.error(response.mensaje);
      response.status && toast.error(response.status);
    }

    dispatch({
      type: STOP_CARGE_INTERNALLY,
    });
  };

export const setChargerOperativo =
  (dataModal, errorId, socket) => async (dispatch, getState) => {
    const responseRegistraError = await registraDetencionError(
      dataModal.puesto.id,
      dataModal.puesto.reservaId,
      errorId,
      socket
    );

    const marquesinas = getState().cargas.marquesinas;
    const indexMarquesina = marquesinas.findIndex(
      (m) => m.id === parseInt(dataModal.marquesina.id, 10)
    );

    const indexCargador = marquesinas[indexMarquesina].cargadores.findIndex(
      (c) => parseInt(c.id, 10) === parseInt(dataModal.cargadorOrigen.id, 10)
    );

    //cambio estado a operativo en arreglo marquesitas
    dispatch(actualizaEstadoGrilla(6));

    //cambio estado de puesto en modal
    dataModal.puesto.estado = 6;
    dataModal.puesto.soc = 0;
    dataModal.puesto.tiempoCarga = "";
    //dataModal.puesto.bus = {};

    dispatch(updateMarquesinasManually(marquesinas));
    dispatch(
      setDataModal(
        dataModal.puesto,
        marquesinas[indexMarquesina],
        marquesinas[indexMarquesina].cargadores[indexCargador]
      )
    );

    const url = `${config.endPoints.operativoPuesto}`;
    const dataApi = {
      puestoId: dataModal.puesto.id,
      ppu: dataModal.puesto.bus.ppu,
      userId: getState().auth.userData.id,
    };
    const { data } = await http.post(url, dataApi);
    toast.info(data.msg);
  };

export const setChargerFree = (dataModal) => async (dispatch, getState) => {
  const marquesinas = getState().cargas.marquesinas;

  const indexMarquesina = marquesinas.findIndex(
    (m) => m.id === parseInt(dataModal.marquesina.id, 10)
  );

  const indexCargador = marquesinas[indexMarquesina].cargadores.findIndex(
    (c) => parseInt(c.id, 10) === parseInt(dataModal.cargadorOrigen.id, 10)
  );

  dispatch(actualizaEstadoGrilla(1));

  //cambio estado de puesto en modal
  dataModal.puesto.estado = 1;
  dataModal.puesto.soc = 0;
  dataModal.puesto.tiempoCarga = "";
  dataModal.puesto.bus = {};

  dispatch(updateMarquesinasManually(marquesinas));
  dispatch(
    setDataModal(
      dataModal.puesto,
      marquesinas[indexMarquesina],
      marquesinas[indexMarquesina].cargadores[indexCargador]
    )
  );

  //se hace llamado a API liberacion de puesto
  const url = `${config.endPoints.liberaPuesto}`;
  const dataApi = {
    puestoId: dataModal.puesto.id,
    userId: getState().auth.userData.id,
  };

  const { data } = await http.post(url, dataApi);
  toast.info(data.msg);

  dispatch({
    type: SET_CHARGER_FREE,
  });
};

export const handleSync =
  (cargadorId, marquesinaId, pistolaId, puestoNombre) =>
  async (dispatch, getState) => {
    const terminalId = localStorage.getItem("terminalId");
    const dataApi = {
      cargadorId,
      pistolaId,
      usuarioId: getState().auth.userData.id,
      amperes: 200,
      terminalId,
    };
    const url = `${config.endPoints.sincronizaPistola}`;
    const { data } = await http.post(url, dataApi);

    toast.info(data.msg);

    dispatch(unsetDataModal());
    dispatch({
      type: HANDLE_SYNC,
    });
  };

export const reservaNuevamente =
  (dataModal, errorId, socket) => async (dispatch, getState) => {
    const responseRegistraError = await registraDetencionError(
      dataModal.puesto.id,
      dataModal.puesto.reservaId,
      errorId,
      socket
    );

    const url = `${config.endPoints.reservaNuevamente}`;
    const dataApi = {
      marquesinaId: dataModal.marquesina.id,
      cargadorId: dataModal.cargadorOrigen.id,
      pistolaId: dataModal.puesto.id,
      ppu: dataModal.puesto.bus.ppu,
      usuarioId: getState().auth.userData.id,
    };
    const { data } = await http.post(url, dataApi);
    //cambiando estado en el modal
    dispatch(actualizaEstadoGrilla(2));
    dispatch(unsetDataModal());
    toast.info(data.msg);
  };

export const makeReserva =
  (marquesinaId, cargadorId, pistolaId, ppu, usuarioId, soc = 0) =>
  async (dispatch, getState) => {
    let data = {};
    const url = `${config.endPoints.reserva}`;
    const patente = ppu
      ? ppu
          .replace("-", "")
          .replace(".", "")
          .replace(" ", "")
          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      : "";

    if (soc != 0) {
      data = {
        marquesinaId: marquesinaId,
        cargadorId: cargadorId,
        pistolaId: pistolaId,
        ppu: patente,
        usuarioId: usuarioId,
        soc,
      };
    } else {
      data = {
        marquesinaId: marquesinaId,
        cargadorId: cargadorId,
        pistolaId: pistolaId,
        ppu: patente,
        usuarioId: usuarioId,
      };
    }

    const { data: response } = await http.post(url, data);
    //console.log("RESPUESTA RESERVA: ", response);

    dispatch({
      type: MAKE_RESERVA,
      payload: response,
    });

    /* if (!response.completado) {
      toast.error(
        "No se ha podido realizar la reserva, por favor intente nuevamente."
      );
      //la redireccion se hara ahora desde Reserva.js
      //history.push({ pathname: "/seleccion/", state: { ppu } });
    } */
  };

export const handleReinicioForzado =
  (pistolaId) => async (dispatch, getState) => {
    const url = `${config.endPoints.reincioForzado}`;
    const { data } = await http.post(url, {
      pistolaId,
      usuarioId: getState().auth.userData.id,
    });
    toast.success(data.msg);

    dispatch(unsetDataModal());
    dispatch({ type: REINICIO_FORZADO });
  };

export const stopChargerOnFailure =
  (marquesinaId, cargadorId, pistolaId, ppu) => async (dispatch, getState) => {
    const url = `${config.endPoints.detieneCargaInterna}`;
    const dataApi = {
      marquesinaId,
      cargadorId,
      pistolaId,
      usuarioId: getState().auth.userData.id,
    };

    const { data } = await http.post(url, dataApi);
    toast.warning(data.msg);

    dispatch({
      type: STOP_CHARGER_ON_FAILURE,
    });
  };

//////// ================================

export const stopPendingChargings = () => async (dispatch) => {
  const response = await stopCargasPendientesAuto();
  //console.log("Respuesta Detencion Auto Cargas: ", response);

  if (response.completado) {
    //se muestra alertas de cargas detenidas
    response.finalizados.map((f) => {
      let pistola = f.pistolaNro === "1" ? "R" : "L";
      toast.info(
        `Se ha finalizado la carga el puesto ${f.cargador.substring(
          4
        )}-${pistola}`
      );
    });
  }

  dispatch({
    type: STOP_PENDING_CHARGINGS,
  });
};

export const handleInspectCharger =
  (dataModal, puestoId, puestoNombre, enInspeccion) =>
  async (dispatch, getState) => {
    const marquesinas = getState().cargas.marquesinas;

    const indexMarquesina = marquesinas.findIndex(
      (m) => m.id === parseInt(dataModal.marquesina.id, 10)
    );

    const indexCargador = marquesinas[indexMarquesina].cargadores.findIndex(
      (c) => parseInt(c.id, 10) === parseInt(dataModal.cargadorOrigen.id, 10)
    );
    //console.log("El indice del cargador es: ", indexCargador);

    //consigo indice de la pistola
    const indexPistola = marquesinas[indexMarquesina].cargadores[
      indexCargador
    ].pistolas.findIndex((p) => p.id === parseInt(dataModal.puesto.id, 10));
    //console.log("El indice de la pistola es: ", indexPistola);

    //cambio estado a descoupado en arreglo marquesitas componente padre
    marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
      indexPistola
    ].enInspeccion = enInspeccion ? 1 : 0;

    //cambio estado de puesto en modal
    dataModal.puesto.enInspeccion = enInspeccion ? 1 : 0;

    dispatch(updateMarquesinasManually(marquesinas));
    dispatch(
      setDataModal(
        dataModal.puesto,
        dataModal.marquesina,
        dataModal.cargadorOrigen
      )
    );

    const { data } = await inspeccionaPuesto(puestoId, enInspeccion);
    toast.success(data.msg);
    dispatch({
      type: HANDLE_INSPECT_CHARGER,
    });
  };

//Reservas Semaforo
export const fetchInnerStateChargers = () => {
  const cargadoresEstadoInterno = obtieneCargadoresEstados();
  return {
    type: FETCH_INNER_STATE_CHARGERS,
    payload: cargadoresEstadoInterno,
  };
};

export const updateInnerStateChargers = (innerChargersState) => {
  return {
    type: UPDATE_INNER_STATE_CHARGERS,
    payload: innerChargersState,
  };
};

export const fetchBusesResume = () => async (dispatch) => {
  const terminalId = localStorage.getItem("terminalId");
  const url = `${config.endPoints.fetchBusesResume}${terminalId}`;
  //console.log("URL BUSES RESUMEN: ", url);
  const { data } = await http.get(url);

  const resumen = [
    {
      id: 1,
      buses: "Cantidad Buses",
      reserva: data.cantidadReservado,
      cargando: data.cantidadCargando,
      ocupado: data.cantidadOcupado,
      operativo: data.cantidadOperativo,
      total:
        parseInt(data.cantidadCargando) +
        parseInt(data.cantidadReservado) +
        parseInt(data.cantidadOcupado) +
        parseInt(data.cantidadOperativo),
    },
  ];

  const detalle = data.detalles;

  //console.log("completo: ", { resumen, detalle });

  dispatch({
    type: FETCH_BUSES_RESUME,
    payload: { resumen, detalle },
  });
};

//otros

const actualizaEstadoGrilla = (estado) => (dispatch, getState) => {
  const marquesinas = getState().cargas.marquesinas;
  const dataModal = getState().cargas.modalData.data;

  //const indexMarquesina = marquesinas.indexOf(dataModal.marquesina);
  const indexMarquesina = marquesinas.findIndex(
    (m) => m.id === parseInt(dataModal.marquesina.id, 10)
  );

  const indexCargador = marquesinas[indexMarquesina].cargadores.findIndex(
    (c) => parseInt(c.id, 10) === parseInt(dataModal.cargadorOrigen.id, 10)
  );

  //consigo indice de la pistola
  const indexPistola = marquesinas[indexMarquesina].cargadores[
    indexCargador
  ].pistolas.findIndex((p) => p.id === parseInt(dataModal.puesto.id, 10));

  marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
    indexPistola
  ].estado = estado;

  if (estado == 1) {
    marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
      indexPistola
    ].bus = {};
  }
};

const actualizaMangueraGrilla = (estado) => (dispatch, getState) => {
  const marquesinas = getState().cargas.marquesinas;
  const dataModal = getState().cargas.modalData.data;

  //const indexMarquesina = marquesinas.indexOf(dataModal.marquesina);
  const indexMarquesina = marquesinas.findIndex(
    (m) => m.id === parseInt(dataModal.marquesina.id, 10)
  );

  const indexCargador = marquesinas[indexMarquesina].cargadores.findIndex(
    (c) => parseInt(c.id, 10) === parseInt(dataModal.cargadorOrigen.id, 10)
  );

  //consigo indice de la pistola
  const indexPistola = marquesinas[indexMarquesina].cargadores[
    indexCargador
  ].pistolas.findIndex((p) => p.id === parseInt(dataModal.puesto.id, 10));

  marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
    indexPistola
  ].manguera = estado;
};

const accionMasivaTecle = async (marquesinaId, accion) => {
  const url = config.global + config.endPoints.accionTecleMasivo;
  const dataTecle = {
    marquesinaId: marquesinaId,
    accion: accion,
  };
  const { data } = await http.post(url, dataTecle);
  return data;
};

const stopCargaInterna = async (
  marquesinaId,
  cargadorId,
  pistolaId,
  usuarioId
) => {
  const url = config.global + config.endPoints.detieneCarga;

  const dataStopCarga = {
    marquesinaId: marquesinaId,
    cargadorId: cargadorId,
    pistolaId: pistolaId,
    amperes: 120,
    usuarioId: usuarioId,
    copec: 0,
  };
  const { data } = await http.post(url, dataStopCarga);
  return data;
};

const cambiaEstadoPuesto = async (pistolaId, estado, patente, usuarioId) => {
  const url = config.global + config.endPoints.cambiaEstadoPuestos;
  const dataCambiaEstado = {
    pistolaId,
    estado,
    patente,
    usuarioId,
  };

  //return { completado: true };

  const { data } = await http.post(url, dataCambiaEstado);
  console.log("Data cambia estado puesto: ", data);
  return data;
};

const registraDetencionError = async (
  pistolaId,
  reservaId,
  errorId,
  socket
) => {
  const dataDetencionError = {
    pistolaId,
    reservaId,
    errorId,
    socket,
  };

  //return { completado: true };

  const url = config.endPoints.registraDetencionError;
  const { data } = await http.post(url, dataDetencionError);
  return data;
};

const stopCargasPendientesAuto = async () => {
  const url = config.global + config.endPoints.stopCargasPendientes;
  const { data } = await http.get(url);
  return data;
};

const inspeccionaPuesto = async (pistolaId, enInspeccion) => {
  const nuevaInspeccion = enInspeccion ? 1 : 0;

  const dataInspeccion = {
    enInspeccion: nuevaInspeccion,
  };
  const urlLogin = `${config.endPoints.inspeccionaPuesto}${pistolaId}`;
  //const urlLogin = config.global + config.endPoints.consultaCargadores;
  const { data } = await http.post(urlLogin, dataInspeccion);
  return data;
};
