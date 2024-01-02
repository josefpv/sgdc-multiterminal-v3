export function ingresaReservaActual(marquesina, fila, puesto, soc, ppu) {
  localStorage.setItem("marquesina", marquesina);
  console.log("en la fila: ", fila);
  localStorage.setItem("fila", fila);
  localStorage.setItem("puesto", puesto);
  localStorage.setItem("soc", soc);
  localStorage.setItem("ppu", ppu);
  return true;
}

export function leeReservaActual() {
  const marquesina = localStorage.getItem("marquesina");
  const fila = localStorage.getItem("fila");
  const puesto = localStorage.getItem("puesto");
  const soc = localStorage.getItem("soc");
  const ppu = localStorage.getItem("ppu");
  return {
    marquesina: marquesina,
    fila: fila,
    puesto: puesto,
    soc: soc,
    ppu: ppu,
  };
}

export default {
  ingresaReservaActual,
  leeReservaActual,
};
