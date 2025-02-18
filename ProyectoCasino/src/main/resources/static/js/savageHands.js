// MODALES (Mensajes, Ayuda y Solicitar Número)
function mostrarMensajeModal(mensaje) {
  const modal = document.getElementById("modal-message");
  document.getElementById("modal-message-text").textContent = mensaje;
  modal.style.display = "flex";
}

document.getElementById("modal-message-close").addEventListener("click", () => {
  document.getElementById("modal-message").style.display = "none";
});

// Modal de Ayuda
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

// Modal de pedir número
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

// VARIABLES Y ESTADOS
let saldoActual = 100;
let fichasActuales = 0;
let apuestaActual = 0;

let mazo = [];
let manoJugador = [];
let manoDealer = [];
let juegoTerminado = false;
let juegoIniciado = false;

const imagenReversoCarta = "./assets/savageHands/card_back.png";

// FUNCIONES DE UTILIDAD
function actualizarSaldo() {
  document.getElementById('dinero-actual').textContent = `DINERO: ${saldoActual}€`;
  document.getElementById('fichas-actuales').textContent = `FICHAS: ${fichasActuales}🎫`;
  document.getElementById('apuesta-actual').textContent = apuestaActual;
}

function actualizarReloj() {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000);
}
actualizarReloj();

// GESTIÓN Y CONVERSIÓN DEL DINERO
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

// FUNCIONES DEL JUEGO
function crearBaraja() {
  mazo = [
    // Spades (♠)
    { palo: '♠', valor: '2', num: 2, imagen: './assets/savageHands/Spades-2.png' },
    { palo: '♠', valor: '3', num: 3, imagen: './assets/savageHands/Spades-3.png' },
    { palo: '♠', valor: '4', num: 4, imagen: './assets/savageHands/Spades-4.png' },
    { palo: '♠', valor: '5', num: 5, imagen: './assets/savageHands/Spades-5.png' },
    { palo: '♠', valor: '6', num: 6, imagen: './assets/savageHands/Spades-6.png' },
    { palo: '♠', valor: '7', num: 7, imagen: './assets/savageHands/Spades-7.png' },
    { palo: '♠', valor: '8', num: 8, imagen: './assets/savageHands/Spades-8.png' },
    { palo: '♠', valor: '9', num: 9, imagen: './assets/savageHands/Spades-9.png' },
    { palo: '♠', valor: '10', num: 10, imagen: './assets/savageHands/Spades-10.png' },
    { palo: '♠', valor: 'J', num: 10, imagen: './assets/savageHands/Spades-Jack.png' },
    { palo: '♠', valor: 'Q', num: 10, imagen: './assets/savageHands/Spades-Queen.png' },
    { palo: '♠', valor: 'K', num: 10, imagen: './assets/savageHands/Spades-King.png' },
    { palo: '♠', valor: 'A', num: 11, imagen: './assets/savageHands/Spades-Ace.png' },

    // Hearts (♥)
    { palo: '♥', valor: '2', num: 2, imagen: './assets/savageHands/Hearts-2.png' },
    { palo: '♥', valor: '3', num: 3, imagen: './assets/savageHands/Hearts-3.png' },
    { palo: '♥', valor: '4', num: 4, imagen: './assets/savageHands/Hearts-4.png' },
    { palo: '♥', valor: '5', num: 5, imagen: './assets/savageHands/Hearts-5.png' },
    { palo: '♥', valor: '6', num: 6, imagen: './assets/savageHands/Hearts-6.png' },
    { palo: '♥', valor: '7', num: 7, imagen: './assets/savageHands/Hearts-7.png' },
    { palo: '♥', valor: '8', num: 8, imagen: './assets/savageHands/Hearts-8.png' },
    { palo: '♥', valor: '9', num: 9, imagen: './assets/savageHands/Hearts-9.png' },
    { palo: '♥', valor: '10', num: 10, imagen: './assets/savageHands/Hearts-10.png' },
    { palo: '♥', valor: 'J', num: 10, imagen: './assets/savageHands/Hearts-Jack.png' },
    { palo: '♥', valor: 'Q', num: 10, imagen: './assets/savageHands/Hearts-Queen.png' },
    { palo: '♥', valor: 'K', num: 10, imagen: './assets/savageHands/Hearts-King.png' },
    { palo: '♥', valor: 'A', num: 11, imagen: './assets/savageHands/Hearts-Ace.png' },

    // Diamonds (♦)
    { palo: '♦', valor: '2', num: 2, imagen: './assets/savageHands/Diamond-2.png' },
    { palo: '♦', valor: '3', num: 3, imagen: './assets/savageHands/Diamond-3.png' },
    { palo: '♦', valor: '4', num: 4, imagen: './assets/savageHands/Diamond-4.png' },
    { palo: '♦', valor: '5', num: 5, imagen: './assets/savageHands/Diamond-5.png' },
    { palo: '♦', valor: '6', num: 6, imagen: './assets/savageHands/Diamond-6.png' },
    { palo: '♦', valor: '7', num: 7, imagen: './assets/savageHands/Diamond-7.png' },
    { palo: '♦', valor: '8', num: 8, imagen: './assets/savageHands/Diamond-8.png' },
    { palo: '♦', valor: '9', num: 9, imagen: './assets/savageHands/Diamond-9.png' },
    { palo: '♦', valor: '10', num: 10, imagen: './assets/savageHands/Diamond-10.png' },
    { palo: '♦', valor: 'J', num: 10, imagen: './assets/savageHands/Diamond-Jack.png' },
    { palo: '♦', valor: 'Q', num: 10, imagen: './assets/savageHands/Diamond-Queen.png' },
    { palo: '♦', valor: 'K', num: 10, imagen: './assets/savageHands/Diamond-King.png' },
    { palo: '♦', valor: 'A', num: 11, imagen: './assets/savageHands/Diamond-Ace.png' },

    // Clubs (♣)
    { palo: '♣', valor: '2', num: 2, imagen: './assets/savageHands/Clubs-2.png' },
    { palo: '♣', valor: '3', num: 3, imagen: './assets/savageHands/Clubs-3.png' },
    { palo: '♣', valor: '4', num: 4, imagen: './assets/savageHands/Clubs-4.png' },
    { palo: '♣', valor: '5', num: 5, imagen: './assets/savageHands/Clubs-5.png' },
    { palo: '♣', valor: '6', num: 6, imagen: './assets/savageHands/Clubs-6.png' },
    { palo: '♣', valor: '7', num: 7, imagen: './assets/savageHands/Clubs-7.png' },
    { palo: '♣', valor: '8', num: 8, imagen: './assets/savageHands/Clubs-8.png' },
    { palo: '♣', valor: '9', num: 9, imagen: './assets/savageHands/Clubs-9.png' },
    { palo: '♣', valor: '10', num: 10, imagen: './assets/savageHands/Clubs-10.png' },
    { palo: '♣', valor: 'J', num: 10, imagen: './assets/savageHands/Clubs-Jack.png' },
    { palo: '♣', valor: 'Q', num: 10, imagen: './assets/savageHands/Clubs-Queen.png' },
    { palo: '♣', valor: 'K', num: 10, imagen: './assets/savageHands/Clubs-King.png' },
    { palo: '♣', valor: 'A', num: 11, imagen: './assets/savageHands/Clubs-Ace.png' }
  ];
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
  return carta.imagen;
}

function mostrarMano(mano, idElemento, ocultarPrimera = false) {
  const contenedor = document.getElementById(idElemento);
  contenedor.innerHTML = "";
  mano.forEach((carta, indice) => {
    const img = document.createElement("img");
    img.className = "carta";
    // Si se indica ocultar la primera carta y el juego no ha terminado, se muestra la carta oculta
    if (ocultarPrimera && indice === 0 && !juegoTerminado) {
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
  // En el dealer se oculta siempre la primera carta mientras el juego no haya finalizado
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

// Finaliza la partida y determina el ganador
function finalizarJuego() {
  juegoTerminado = true;
  // El dealer reparte cartas hasta alcanzar al menos 17
  while (calcularPuntuacion(manoDealer) < 17) {
    repartirCarta(manoDealer);
  }
  actualizarPantalla();
  const puntosJugador = calcularPuntuacion(manoJugador);
  const puntosDealer = calcularPuntuacion(manoDealer);
  let mensaje = "";
  if (puntosJugador > 21) {
    mensaje = "¡Te pasaste de 21! Gana el Dealer.";
  } else if (puntosDealer > 21) {
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
  // Se vuelve a habilitar el botón "Nuevo Juego"
  document.getElementById("nuevo-juego").disabled = false;
}

// Inicia una nueva partida (solo si hay apuesta)
function nuevoJuego() {
  if (apuestaActual <= 0) {
    mostrarMensajeModal("Debes realizar una apuesta antes de iniciar el juego.");
    return;
  }
  // Bloquea el botón "Nuevo Juego" para evitar múltiples clics
  document.getElementById("nuevo-juego").disabled = true;
  
  // Reinicia el estado del juego
  juegoTerminado = false;
  manoJugador = [];
  manoDealer = [];
  document.getElementById("mensaje").textContent = "";
  crearBaraja();
  mezclarBaraja();
  
  // Reparte las cartas iniciales
  repartirCarta(manoJugador);
  repartirCarta(manoDealer);
  repartirCarta(manoJugador);
  repartirCarta(manoDealer);
  
  // Importante: establecer que el juego ha iniciado ANTES de actualizar la pantalla,
  // para que la función que muestra las cartas sepa que debe ocultar la primera carta del dealer
  juegoIniciado = true;
  
  actualizarPantalla();
  
  // Verificar si el jugador tiene blackjack (21 con dos cartas)
  if (calcularPuntuacion(manoJugador) === 21 && manoJugador.length === 2) {
    juegoTerminado = true;
    actualizarPantalla(); // Revela la carta oculta del dealer
    if (calcularPuntuacion(manoDealer) === 21 && manoDealer.length === 2) {
      mostrarMensajeModal("¡Empate! Ambos tienen 21.");
      fichasActuales += apuestaActual; // Recuperas tu apuesta
    } else {
      mostrarMensajeModal("¡Blackjack! Has ganado el doble.");
      fichasActuales += apuestaActual * 2;
    }
    apuestaActual = 0;
    deshabilitarBotonesJuego();
    actualizarSaldo();
    // Se vuelve a habilitar el botón "Nuevo Juego"
    document.getElementById("nuevo-juego").disabled = false;
    return;
  }
  
  habilitarBotonesJuego();
}

// Evento nuevo Juego
document.getElementById("nuevo-juego").addEventListener("click", nuevoJuego);

// Evento pedir Carta
document.getElementById("pedir-carta").addEventListener("click", () => {
  if (!juegoTerminado && juegoIniciado) {
    repartirCarta(manoJugador);
    actualizarPantalla();
    if (calcularPuntuacion(manoJugador) > 21) {
      finalizarJuego();
    }
  }
});

// Evento plantarse
document.getElementById("plantarse").addEventListener("click", () => {
  if (!juegoTerminado && juegoIniciado) {
    finalizarJuego();
  }
});

// Apuestas
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

// Al cargar la página se actualiza el saldo y se deshabilitan los botones de juego
actualizarSaldo();
deshabilitarBotonesJuego();