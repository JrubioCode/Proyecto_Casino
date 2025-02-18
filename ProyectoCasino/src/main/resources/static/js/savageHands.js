// Modal mensajes
function mostrarMensajeModal(mensaje) {
  const modal = document.getElementById("modal-message");
  document.getElementById("modal-message-text").textContent = mensaje;
  modal.style.display = "flex";
}

document.getElementById("modal-message-close").addEventListener("click", () => {
  document.getElementById("modal-message").style.display = "none";
});

// Modal ayuda
const botonAyuda = document.getElementById('toggle-ayuda');
const modalAyuda = document.getElementById('modal-ayuda');
const cerrarModal = document.getElementById('cerrar-modal');

botonAyuda.addEventListener('click', () => {
  modalAyuda.classList.add('show');
});
cerrarModal.addEventListener('click', () => {
  modalAyuda.classList.remove('show');
});
window.addEventListener('click', (e) => {
  if (e.target === modalAyuda) {
    modalAyuda.classList.remove('show');
  }
});

// Modal de pedir numero
function solicitarNumero(mensaje) {
  return new Promise((resolver) => {
    const modalSolicitud = document.getElementById("modal-solicitud");
    const textoModal = document.getElementById("modal-solicitud-text");
    const inputModal = document.getElementById("modal-solicitud-input");
    const btnAceptar = document.getElementById("modal-solicitud-aceptar");
    const btnCancelar = document.getElementById("modal-solicitud-cancelar");
    
    textoModal.textContent = mensaje;
    inputModal.value = "";
    modalSolicitud.style.display = "flex";
    
    function limpiarYResolver(valor) {
      modalSolicitud.style.display = "none";
      btnAceptar.removeEventListener("click", onAceptar);
      btnCancelar.removeEventListener("click", onCancelar);
      resolver(valor);
    }
    
    function onAceptar() {
      const valor = parseInt(inputModal.value, 10);
      if (isNaN(valor) || valor <= 0) {
        mostrarMensajeModal("Por favor ingresa un número válido mayor a 0.");
      } else {
        limpiarYResolver(valor);
      }
    }
    
    function onCancelar() {
      limpiarYResolver(null);
    }
    
    btnAceptar.addEventListener("click", onAceptar);
    btnCancelar.addEventListener("click", onCancelar);
  });
}

//  Variables Globales y Estado del Juego
let saldoActual = 1000;
let fichasActuales = 0;
let apuestaActual = 0;

let mazo = [];
let manoJugador = [];
let manoDealer = [];
let juegoTerminado = false;    // Indica si la partida terminó
let juegoIniciado = false;      // Indica si hay una partida en curso

const imagenReversoCarta = "./assets/savageHands/card_back.png";
const mapaPalos = {
  "♠": "spades",
  "♥": "hearts",
  "♦": "diamonds",
  "♣": "clubs"
};

// Actualizar saldo
function actualizarSaldo() {
  document.getElementById('dinero-actual').textContent = `DINERO: ${saldoActual}€`;
  document.getElementById('fichas-actuales').textContent = `FICHAS: ${fichasActuales}🎫`;
  document.getElementById('apuesta-actual').textContent = apuestaActual;
}

// Gestion y conversion del dinero
document.getElementById('boton-ingresar-dinero').addEventListener('click', async () => {
  const cantidad = await solicitarNumero("¿Cuánto dinero deseas ingresar?");
  if (cantidad !== null) {
    saldoActual += cantidad;
    actualizarSaldo();
  }
});

document.getElementById('boton-retirar-dinero').addEventListener('click', async () => {
  const cantidad = await solicitarNumero("¿Cuánto dinero deseas retirar?");
  if (cantidad !== null) {
    if (cantidad <= saldoActual) {
      saldoActual -= cantidad;
      actualizarSaldo();
    } else {
      mostrarMensajeModal("Cantidad inválida o superior a tu saldo.");
    }
  }
});

document.getElementById('boton-convertir-a-fichas').addEventListener('click', () => {
  if (saldoActual > 0) {
    fichasActuales += saldoActual;
    saldoActual = 0;
    actualizarSaldo();
  } else {
    mostrarMensajeModal("No tienes dinero para convertir.");
  }
});

document.getElementById('boton-convertir-a-dinero').addEventListener('click', () => {
  if (fichasActuales > 0) {
    saldoActual += fichasActuales;
    fichasActuales = 0;
    actualizarSaldo();
  } else {
    mostrarMensajeModal("No tienes fichas para convertir.");
  }
});

// Reloj
function actualizarReloj() {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000);
}
actualizarReloj();

// Baraja
const palos = ['♠', '♥', '♦', '♣'];
const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function crearBaraja() {
  mazo = [];
  for (let palo of palos) {
    for (let valor of valores) {
      let num = parseInt(valor);
      if (['J', 'Q', 'K'].includes(valor)) num = 10;
      else if (valor === 'A') num = 11;
      mazo.push({ palo, valor, num });
    }
  }
}

function mezclarBaraja() {
  for (let i = mazo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
  }
}

function repartirCarta(mano) {
  if (mazo.length === 0) {
    crearBaraja();
    mezclarBaraja();
  }
  const carta = mazo.pop();
  mano.push(carta);
  return carta;
}

function calcularPuntuacion(mano) {
  let total = mano.reduce((suma, carta) => suma + carta.num, 0);
  let ases = mano.filter(carta => carta.valor === 'A').length;
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }
  return total;
}

function obtenerImagenCarta(carta) {
  const nombrePalo = mapaPalos[carta.palo];
  return `./assets/cartas/${carta.valor}_${nombrePalo}.png`;
}

function mostrarMano(mano, idElemento, ocultarPrimera = false) {
  const contenedor = document.getElementById(idElemento);
  contenedor.innerHTML = "";
  mano.forEach((carta, indice) => {
    const img = document.createElement("img");
    img.className = "carta";
    if (ocultarPrimera && indice === 0 && !juegoTerminado && juegoIniciado) {
      img.src = imagenReversoCarta;
      img.alt = "Carta oculta";
    } else {
      img.src = obtenerImagenCarta(carta);
      img.alt = `${carta.valor} de ${carta.palo}`;
    }
    contenedor.appendChild(img);
  });
}

function actualizarPantalla() {
  mostrarMano(manoJugador, "mano-jugador");
  mostrarMano(manoDealer, "mano-dealer", true);
  const puntosJugador = calcularPuntuacion(manoJugador);
  const puntosDealer = calcularPuntuacion(manoDealer);
  document.getElementById('puntuacion-jugador').textContent = `Puntuación: ${puntosJugador}`;
  document.getElementById('puntuacion-dealer').textContent =
    (juegoTerminado) ? `Puntuación: ${puntosDealer}` : "Puntuación: ?";
}

function deshabilitarBotonesJuego() {
  document.getElementById("pedir-carta").disabled = true;
  document.getElementById("plantarse").disabled = true;
}

function habilitarBotonesJuego() {
  document.getElementById("pedir-carta").disabled = false;
  document.getElementById("plantarse").disabled = false;
}

/* Finaliza la partida y determina el ganador */
function finalizarJuego() {
  juegoTerminado = true;
  while (calcularPuntuacion(manoDealer) < 17) {
    repartirCarta(manoDealer);
  }
  actualizarPantalla();
  const puntosJugador = calcularPuntuacion(manoJugador);
  const puntosDealer = calcularPuntuacion(manoDealer);
  let mensaje = "";
  if (puntosJugador > 21) mensaje = "¡Te pasaste de 21! Gana el Dealer.";
  else if (puntosDealer > 21) {
    mensaje = "¡El Dealer se pasó de 21! Ganaste.";
    fichasActuales += apuestaActual;
  } else if (puntosJugador === puntosDealer) {
    mensaje = "¡Empate! Recuperas tu apuesta.";
    fichasActuales += apuestaActual;
  } else if (puntosJugador > puntosDealer) {
    mensaje = "¡Ganaste!";
    fichasActuales += apuestaActual;
  } else {
    mensaje = "Gana el Dealer.";
  }
  actualizarSaldo();
  deshabilitarBotonesJuego();
  mostrarMensajeModal(mensaje);
  apuestaActual = 0;
  document.getElementById('apuesta-actual').textContent = 0;
  juegoIniciado = false;
}

/* Inicia una nueva partida (solo si hay apuesta) */
function nuevoJuego() {
  if (apuestaActual <= 0) {
    mostrarMensajeModal("Debes realizar una apuesta antes de iniciar el juego.");
    return;
  }
  // Inicia la partida y bloquea las apuestas
  juegoTerminado = false;
  manoJugador = [];
  manoDealer = [];
  document.getElementById("mensaje").textContent = "";
  crearBaraja();
  mezclarBaraja();
  repartirCarta(manoJugador);
  repartirCarta(manoDealer);
  repartirCarta(manoJugador);
  repartirCarta(manoDealer);
  actualizarPantalla();
  habilitarBotonesJuego();
  juegoIniciado = true;
  
}

/* =========================
   Eventos de Control del Juego
   ========================= */
// Al pulsar "Nuevo Juego" se inicia la partida (si hay apuesta)
document.getElementById("nuevo-juego").addEventListener("click", nuevoJuego);

// Solo se permiten acciones de juego si hay partida en curso
document.getElementById("pedir-carta").addEventListener("click", () => {
  if (!juegoTerminado && juegoIniciado) {
    repartirCarta(manoJugador);
    actualizarPantalla();
    if (calcularPuntuacion(manoJugador) > 21) {
      finalizarJuego();
    }
  }
});

document.getElementById("plantarse").addEventListener("click", () => {
  if (!juegoTerminado && juegoIniciado) {
    finalizarJuego();
  }
});

/* =========================
   Eventos de Apuestas (Chips)
   ========================= */
// Durante una partida no se permite modificar la apuesta
const elementosChip = document.querySelectorAll(".chip");
elementosChip.forEach(chip => {
  chip.addEventListener("click", () => {
    if (juegoIniciado) {
      mostrarMensajeModal("No puedes apostar durante una partida.");
      return;
    }
    const valor = parseInt(chip.getAttribute("data-value"), 10);
    if (fichasActuales >= valor) {
      apuestaActual += valor;
      fichasActuales -= valor;
      actualizarSaldo();
    } else {
      mostrarMensajeModal("No tienes suficientes fichas para apostar ese valor.");
    }
  });
});

document.getElementById("reiniciar-apuesta").addEventListener("click", () => {
  if (juegoIniciado) {
    mostrarMensajeModal("No puedes reiniciar la apuesta durante una partida.");
    return;
  }
  fichasActuales += apuestaActual;
  apuestaActual = 0;
  actualizarSaldo();
});

/* =========================
   Inicialización
   ========================= */
// Al cargar la página, se actualiza el saldo y se deshabilitan los botones de juego
actualizarSaldo();
deshabilitarBotonesJuego();