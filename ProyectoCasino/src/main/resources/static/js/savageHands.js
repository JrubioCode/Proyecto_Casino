// Configuración de la baraja
const palos = ['♠', '♥', '♦', '♣'];
const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

var baraja = [];
var manoJugador = [];
var manoDealer = [];
var juegoTerminado = false;
var jugadorPlantado = false;

// Crear la baraja
function crearBaraja() {
  baraja = [];
  for (var palo of palos) {
    for (var valor of valores) {
      var num = parseInt(valor);
      if (valor === 'J' || valor === 'Q' || valor === 'K') {
        num = 10;
      } else if (valor === 'A') {
        num = 11; // El As vale inicialmente 11
      }
      baraja.push({ palo, valor, num });
    }
  }
}

// Mezclar la baraja con el algoritmo de Fisher-Yates
function mezclarBaraja() {
  for (var i = baraja.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
  }
}

// Repartir una carta a una mano determinada
function repartirCarta(mano) {
  if (baraja.length === 0) {
    crearBaraja();
    mezclarBaraja();
  }
  const carta = baraja.pop();
  mano.push(carta);
  return carta;
}

// Calcular la puntuación de una mano
function calcularPuntuacion(mano) {
  var total = mano.reduce((suma, carta) => suma + carta.num, 0);
  // Ajuste para Ases: si se pasa de 21, cada As vale 1 en lugar de 11
  var ases = mano.filter(carta => carta.valor === 'A').length;
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }
  return total;
}

// Mostrar las cartas en pantalla en un elemento
function mostrarMano(mano, idElemento) {
  const contenedor = document.getElementById(idElemento);
  contenedor.innerHTML = '';
  mano.forEach(carta => {
    const divCarta = document.createElement('div');
    divCarta.className = 'carta';
    divCarta.textContent = `${carta.valor}${carta.palo}`;
    contenedor.appendChild(divCarta);
  });
}

// Actualizar las puntuaciones en pantalla
function actualizarPuntuaciones() {
  const puntosJugador = calcularPuntuacion(manoJugador);
  const puntosDealer = calcularPuntuacion(manoDealer);
  document.getElementById('puntuacion-jugador').textContent = `Puntuación: ${puntosJugador}`;
  
  // Se muestra la puntuación completa del dealer solo si el juego terminó o el jugador se plantó
  if (juegoTerminado || jugadorPlantado) {
    document.getElementById('puntuacion-dealer').textContent = `Puntuación: ${puntosDealer}`;
  } else {
    document.getElementById('puntuacion-dealer').textContent = `Puntuación: ?`;
  }
}

// Comprobar si el jugador se pasó de 21
function comprobarFinJuego() {
  const puntos = calcularPuntuacion(manoJugador);
  if (puntos > 21) {
    finalizarJuego();
  }
}

// Turno del dealer: pide cartas hasta tener 17 o más
function turnoDealer() {
  var puntosDealer = calcularPuntuacion(manoDealer);
  while (puntosDealer < 17) {
    repartirCarta(manoDealer);
    puntosDealer = calcularPuntuacion(manoDealer);
  }
}

// Finalizar el juego y determinar el ganador
function finalizarJuego() {
  juegoTerminado = true;
  jugadorPlantado = true;
  turnoDealer();
  actualizarTodo();
  
  const puntosJugador = calcularPuntuacion(manoJugador);
  const puntosDealer = calcularPuntuacion(manoDealer);
  var mensaje = '';
  
  if (puntosJugador > 21) {
    mensaje = '¡Te pasaste de 21! Gana el Dealer.';
  } else if (puntosDealer > 21) {
    mensaje = '¡El Dealer se pasó de 21! Ganaste.';
  } else if (puntosJugador === puntosDealer) {
    mensaje = '¡Empate!';
  } else if (puntosJugador > puntosDealer) {
    mensaje = '¡Ganaste!';
  } else {
    mensaje = 'Gana el Dealer.';
  }
  
  document.getElementById('mensaje').textContent = mensaje;
  desactivarBotones();
}

// Actualizar ambas manos y puntuaciones
function actualizarTodo() {
  mostrarMano(manoJugador, 'mano-jugador');
  mostrarMano(manoDealer, 'mano-dealer');
  actualizarPuntuaciones();
}

// Desactivar botones al finalizar la partida
function desactivarBotones() {
  document.getElementById('pedir-carta').disabled = true;
  document.getElementById('plantarse').disabled = true;
}

// Iniciar un nuevo juego
function nuevoJuego() {
  juegoTerminado = false;
  jugadorPlantado = false;
  manoJugador = [];
  manoDealer = [];
  document.getElementById('mensaje').textContent = '';
  document.getElementById('pedir-carta').disabled = false;
  document.getElementById('plantarse').disabled = false;
  crearBaraja();
  mezclarBaraja();
  // Repartir dos cartas a cada uno
  repartirCarta(manoJugador);
  repartirCarta(manoDealer);
  repartirCarta(manoJugador);
  repartirCarta(manoDealer);
  actualizarTodo();
}

// -----------------------------
// Eventos de control del juego
// -----------------------------
document.getElementById('nuevo-juego').addEventListener('click', nuevoJuego);
document.getElementById('pedir-carta').addEventListener('click', () => {
  if (!juegoTerminado && !jugadorPlantado) {
    repartirCarta(manoJugador);
    actualizarTodo();
    comprobarFinJuego();
  }
});
document.getElementById('plantarse').addEventListener('click', () => {
  if (!juegoTerminado) {
    jugadorPlantado = true;
    finalizarJuego();
  }
});

// -----------------------------
// Lógica del Modal de Ayuda
// -----------------------------
const toggleAyuda = document.getElementById('toggle-ayuda');
const modalAyuda = document.getElementById('modal-ayuda');
const cerrarModal = document.getElementById('cerrar-modal');

toggleAyuda.addEventListener('click', () => {
  modalAyuda.classList.remove('oculto');
  modalAyuda.classList.add('animarModal');
});

cerrarModal.addEventListener('click', () => {
  modalAyuda.classList.add('oculto');
  modalAyuda.classList.remove('animarModal');
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target == modalAyuda) {
    modalAyuda.classList.add('oculto');
    modalAyuda.classList.remove('animarModal');
  }
});

// Iniciar el juego al cargar la página
nuevoJuego();