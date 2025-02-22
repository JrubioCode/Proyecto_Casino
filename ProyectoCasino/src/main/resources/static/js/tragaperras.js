/* FUNCIONALIDAD DEL RELOJ */
var actualizarReloj = () => {
  document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
  setTimeout(actualizarReloj, 1000);
};
actualizarReloj();

/* ABRIR Y CERRAR MODAL DE AJUSTES */
function modalAjustes() {
  const modal = document.getElementById("modal-ajustes");

  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}

// Seleccionamos el botón y el modal
const infoBtn = document.getElementById('infoBtn');
const infoModal = document.getElementById('infoModal');

// Mostrar el modal
infoBtn.addEventListener('click', () => {
  infoModal.style.display = 'flex';
});

// Cerrar el modal
window.addEventListener('click', (event) => {
  if (event.target === infoModal) {
    infoModal.style.display = 'none';
  }
});

/* EVENTO PARA CAMBIAR EL TIPO DE COLOR */
window.addEventListener("DOMContentLoaded", () => {
  const switchElement = document.getElementById("switch");
  const filtro = document.getElementById("blancoYnegro");

  if (switchElement.checked) {
    filtro.style.display = "none"; // Modo claro
    document.getElementById("switch").setAttribute("aria-label", "Modo claro");
  } else {
    filtro.style.display = "block"; // Modo noche
    document.getElementById("switch").setAttribute("aria-label", "Modo noche");
  }

  // Evento para alternar entre modos
  switchElement.addEventListener("change", (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      filtro.style.display = "none"; // Modo claro
      document.getElementById("switch").setAttribute("aria-label", "Modo claro");
    } else {
      filtro.style.display = "block"; // Modo noche
      document.getElementById("switch").setAttribute("aria-label", "Modo noche");
    }
  });
});

// Crear el objeto de audio
const musicaFondo = new Audio("./audios/audio-principal.mp3");
musicaFondo.loop = true; // La música se repetirá
musicaFondo.volume = 0.5; // Volumen inicial

// Referencia al control de volumen en el HTML
const iconoVolumen = document.getElementById('icono-volumen');
const controlVolumen = document.getElementById('control-volumen');

// Estado del sonido
let musicaMuteada = false;

// Función para reproducir música
function reproducirMusica() {
    if (musicaFondo.paused) {
        musicaFondo.play();
    }
}

// Función para alternar entre silenciar y activar música
function alternarSonido() {
    if (musicaMuteada) {
        musicaFondo.muted = false;
        musicaMuteada = false;
        iconoVolumen.src = './assets/ajustes/volumen.png';
    } else {
        musicaFondo.muted = true;
        musicaMuteada = true;
        iconoVolumen.src = './assets/ajustes/mute.png';
    }
}

controlVolumen.addEventListener('click', alternarSonido);

function iniciarMusicaAlInteraccion() {
    document.addEventListener('click', reproducirMusica, { once: true });
    document.addEventListener('scroll', reproducirMusica, { once: true });
    document.addEventListener('keydown', reproducirMusica, { once: true });
}

// Llamar a la función para habilitar las interacciones iniciales
iniciarMusicaAlInteraccion();

// Función para reproducir el sonido de la palanca
function sonidoPalanca() {
  const audioPalanca = new Audio("./audios/sonido-palanca.mp3");
  audioPalanca.volume = 0.7; // Ajustar el volumen, 70% en este caso
  audioPalanca.play();
}

// Función para reproducir el sonido del premio
function sonidoPremio(){
  const audioPalanca = new Audio("./audios/sonido-premio.mp3");
  audioPalanca.volume = 0.7;
  audioPalanca.play();
}

/* GESTIÓN DEL SALDO */
var saldo = 0;
var fichas = 0;

// Función para mostrar un modal
function mostrarModal(modal) {
    modal.style.display = "flex";
}

// Función para cerrar un modal
function cerrarModal(modal) {
    modal.style.display = "none";
}

// Mostrar modales
document.getElementById("boton-ingresar-dinero").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-meter-dinero"));
});

document.getElementById("boton-retirar-dinero").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-retirar-dinero"));
});

document.getElementById("boton-convertir-a-fichas").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-conversion-fichas"));
});

document.getElementById("boton-convertir-a-dinero").addEventListener("click", function () {
    mostrarModal(document.getElementById("modal-conversion-saldo"));
});

// Cerrar los modales
document.getElementById("boton-cerrar-meter-dinero-modal").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-meter-dinero"));
});

document.getElementById("boton-cerrar-retirar-dinero-modal").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-retirar-dinero"));
});

document.getElementById("boton-cerrar-conversion-fichas").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-conversion-fichas"));
});

document.getElementById("boton-cerrar-conversion-saldo").addEventListener("click", function () {
    cerrarModal(document.getElementById("modal-conversion-saldo"));
});

// Ingresar dinero
document.getElementById("boton-meter-dinero-modal").addEventListener("click", function () {
  const cantidadDinero = parseFloat(document.getElementById("input-introducir-dinero").value);
  const comprobacion = document.getElementById("comprobacion-meter-dinero");

  if (cantidadDinero <= 0 || isNaN(cantidadDinero)) {
      comprobacion.textContent = estaEnIngles() ? "Please introduce a correct quantity" : "Por favor, ingresa una cantidad válida.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
  } else {
      // Obtener el saldo actual de la base de datos
      const dni = localStorage.getItem("dni");
      if (dni) {
          $.ajax({
              type: "GET",
              url: `/usuario/obtenerSaldo/${dni}`,
              success: function(saldoActual) {
                  saldoActual = parseFloat(saldoActual);
                  const nuevoSaldo = saldoActual + cantidadDinero;
                  actualizarSaldoEnBD(nuevoSaldo);
                  actualizarSaldo();
                  cerrarModal(document.getElementById("modal-meter-dinero"));
              },
              error: function(error) {
              }
          });
      }
  }

  document.getElementById("input-introducir-dinero").value = '';
});

document.getElementById("boton-cerrar-meter-dinero-modal").addEventListener("click", function () {
  document.getElementById("input-introducir-dinero").value = '';
  cerrarModal(document.getElementById("modal-meter-dinero"));
});

// Retirar dinero
document.getElementById("boton-retirar-dinero-modal").addEventListener("click", function () {
  const cantidadDinero = parseFloat(document.getElementById("input-retirar-dinero").value);
  const comprobacion = document.getElementById("comprobacion-retirar-dinero");

  if (cantidadDinero <= 0 || isNaN(cantidadDinero)) {
      comprobacion.textContent = estaEnIngles() ? "Please introduce a correct quantity" : "Por favor, ingresa una cantidad válida.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
  } else {
      // Obtener el saldo actual de la base de datos
      const dni = localStorage.getItem("dni");
      if (dni) {
          $.ajax({
              type: "GET",
              url: `/usuario/obtenerSaldo/${dni}`,
              success: function(saldoActual) {
                  saldoActual = parseFloat(saldoActual);
                  if (cantidadDinero > saldoActual) {
                      comprobacion.textContent = estaEnIngles() ? "Not enough money" : "No tienes suficiente saldo.";
                      comprobacion.style.color = "red";
                      setTimeout(() => {
                          comprobacion.textContent = "";
                      }, 1500);
                  } else {
                      const nuevoSaldo = saldoActual - cantidadDinero;
                      actualizarSaldoEnBD(nuevoSaldo);
                      actualizarSaldo();
                      cerrarModal(document.getElementById("modal-retirar-dinero"));
                  }
              },
              error: function(error) {
              }
          });
      }
  }

  document.getElementById("input-retirar-dinero").value = '';
});

// Convertir saldo a fichas
document.getElementById("boton-convertir-fichas").addEventListener("click", function () {
  const cantidadEuros = parseFloat(document.getElementById("input-cantidad-conversion-fichas").value);
  const comprobacion = document.getElementById("comprobacion-convertir-a-fichas");
  const idJuego = 2;

  if (cantidadEuros <= 0 || isNaN(cantidadEuros)) {
      comprobacion.textContent = estaEnIngles() ? "Please introduce a correct quantity" : "Por favor, ingresa una cantidad válida.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
      return;
  }

  const dni = localStorage.getItem("dni");
  if (!dni) {
      return;
  }

  // Obtener el multiplicador desde el backend
  $.ajax({
      type: "GET",
      url: `/conversion/obtenerMultiplicador/${idJuego}`,
      success: function (multiplicador) {
          multiplicador = parseFloat(multiplicador);
          if (isNaN(multiplicador) || multiplicador <= 0) {
              comprobacion.textContent = estaEnIngles() ? "Conversion rate not available" : "Tasa de conversión no disponible.";
              comprobacion.style.color = "red";
              setTimeout(() => {
                  comprobacion.textContent = "";
              }, 1500);
              return;
          }

          // Obtener el saldo actual del usuario
          $.ajax({
              type: "GET",
              url: `/usuario/obtenerSaldo/${dni}`,
              success: function (saldoActual) {
                  saldoActual = parseFloat(saldoActual);
                  if (cantidadEuros > saldoActual) {
                      comprobacion.textContent = estaEnIngles() ? "Not enough money" : "No tienes suficiente saldo.";
                      comprobacion.style.color = "red";
                      setTimeout(() => {
                          comprobacion.textContent = "";
                      }, 1500);
                  } else {
                      const cantidadFichas = cantidadEuros * multiplicador;
                      fichas += cantidadFichas;
                      const nuevoSaldo = saldoActual - cantidadEuros;
                      actualizarSaldoEnBD(nuevoSaldo);
                      actualizarSaldo();
                      cerrarModal(document.getElementById("modal-conversion-fichas"));
                  }
              },
              error: function (error) {
              }
          });
      },
      error: function (error) {
          comprobacion.textContent = estaEnIngles() ? "Error getting conversion rate" : "Error al obtener la tasa de conversión.";
          comprobacion.style.color = "red";
          setTimeout(() => {
              comprobacion.textContent = "";
          }, 1500);
      }
  });

  document.getElementById("input-cantidad-conversion-fichas").value = '';
});

// Convertir fichas a saldo
document.getElementById("boton-convertir-saldo").addEventListener("click", function () {
  const cantidadFichas = parseInt(document.getElementById("input-cantidad-conversion-saldo").value);
  const comprobacion = document.getElementById("comprobacion-convertir-a-dinero");
  const idJuego = 2;

  if (cantidadFichas <= 0 || isNaN(cantidadFichas)) {
      // Verificar que se introduzca una cantidad válida
      comprobacion.textContent = estaEnIngles() ? "Please introduce a correct quantity" : "Por favor, ingresa una cantidad válida.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
      return;
  } else if (cantidadFichas > fichas) {
      // Verificar que haya suficientes fichas para la conversión
      comprobacion.textContent = estaEnIngles() ? "Not enough chips" : "No tienes suficientes fichas.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
      return;
  }

  // Obtener el multiplicador desde el backend
  $.ajax({
      type: "GET",
      url: `/conversion/obtenerMultiplicador/${idJuego}`,
      success: function (multiplicador) {
          multiplicador = parseFloat(multiplicador);
          if (isNaN(multiplicador) || multiplicador <= 0) {
              comprobacion.textContent = estaEnIngles() ? "Conversion rate not available" : "Tasa de conversión no disponible.";
              comprobacion.style.color = "red";
              setTimeout(() => {
                  comprobacion.textContent = "";
              }, 1500);
              return;
          }

          // Convertir fichas a euros utilizando el multiplicador dinámico
          const cantidadDinero = cantidadFichas / multiplicador;
          const nuevoSaldo = saldo + cantidadDinero;

          // Actualizar el saldo y las fichas
          fichas -= cantidadFichas;
          actualizarSaldoEnBD(nuevoSaldo);
          actualizarSaldo();

          // Cerrar el modal
          cerrarModal(document.getElementById("modal-conversion-saldo"));
      },
      error: function (error) {
          comprobacion.textContent = estaEnIngles() ? "Error getting conversion rate" : "Error al obtener la tasa de conversión.";
          comprobacion.style.color = "red";
          setTimeout(() => {
              comprobacion.textContent = "";
          }, 1500);
      }
  });

  // Limpiar el campo de entrada
  document.getElementById("input-cantidad-conversion-saldo").value = '';
});

// Registrar tiradas en base de datos
function registrarTiradaEnBD(apuesta, combinacion, resultado) {
  const dni = localStorage.getItem("dni");
  const idJuego = 2;

  if (!dni) {
      return;
  }

  const datos = {
      usuarioDni: dni,
      juegoId: idJuego,
      fechaLogHistorico: new Date().toISOString(),
  };

  $.ajax({
      type: "POST",
      url: "/historico/registrar",
      contentType: "application/json",
      data: JSON.stringify(datos),
      success: function(response) {
        registrarTiradaPrehistoricSlotRunEnBD(apuesta, combinacion, resultado)
      },
      error: function(error) {
          
      }
  });
}

function registrarTiradaPrehistoricSlotRunEnBD(apuesta, combinacion, resultado) {
  const dni = localStorage.getItem("dni");
  const idJuego = 2;

  if (!dni) {
    return;
  }

  $.ajax({
    type: "GET",
    url: "/prehistoricSlot/historicoId",
    success: function(historicoId) {
      if (historicoId) { 
        const datos = {
          apuesta: apuesta, 
          combinacion: combinacion, 
          resultado: resultado,
          usuarioDni: dni,
          juegoId: idJuego,
          historicoId: historicoId
        };

        $.ajax({
          type: "POST",
          url: "/prehistoricSlot/registrar",
          contentType: "application/json",
          data: JSON.stringify(datos),
          success: function(response) {
            console.log("Tirada registrada en CavemanRun con éxito");
          },
          error: function(error) {
            console.error("Error registrando tirada en CavemanRun", error);
          }
        });
      } else {
        console.error("No se obtuvo historicoId");
      }
    },
    error: function(error) {
      console.error("Error al obtener historicoId", error);
    }
  });
}

// Funcionalidad tragaperras
var cavernicola = "/assets/prehistoricSlot/tragaperras/cavernicola.png";
var fuego = "/assets/prehistoricSlot/tragaperras/fuego.png";
var pollo = "/assets/prehistoricSlot/tragaperras/pollo.png";
var mamut = "/assets/prehistoricSlot/tragaperras/mamut.png";
var grupoCavernicolas = "/assets/prehistoricSlot/tragaperras/grupoCavernicolas.png";
var comodin = "/assets/prehistoricSlot/tragaperras/comodin.jpg";

var premios = {
  cavernicola: 100,
  fuego: 200,
  pollo: 300,
  mamut: 500,
  grupoCavernicolas: 1000,
  comodin: 5000
};

var simbolos = [cavernicola, fuego, pollo, mamut, grupoCavernicolas, comodin];

// Evento para el clic en la palanca
document.getElementById("palanca").addEventListener("click", () => {
  if (fichas >= 25 && !estaGirando()) { 
    sonidoPalanca();
    cambiarPalanca();
    girar();
    fichas -= 25;
    actualizarSaldo();
    mostrarMensajePremio("🎰 Girando...");
  } else if (fichas < 25) {
    if (estaEnIngles()) {
      mostrarMensajePremio("¡Not enough tokens to play!");
    } else {
      mostrarMensajePremio("¡No tienes suficientes fichas para jugar!");
    }
  }
});

// Evento para el clic en la tecla espacio
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevenir que otras acciones por defecto se disparen (como scroll, etc.)

    if (fichas >= 25 && !estaGirando()) {
      sonidoPalanca();
      cambiarPalanca();
      girar();
      fichas -= 25;  
      actualizarSaldo();
      mostrarMensajePremio("🎰 Girando...");
    } else if (fichas < 25) {
      if (estaEnIngles()) {
        mostrarMensajePremio("¡Not enough tokens to play!");
      } else {
        mostrarMensajePremio("¡No tienes suficientes fichas para jugar!");
      }
    }
  }
});

// Función para cambiar la imagen de la palanca
function cambiarPalanca(){
  document.getElementById("palanca").src = "./assets/prehistoricSlot/tragaperras/palanca_abajo.png";
  setTimeout(() => {
    document.getElementById("palanca").src = "./assets/prehistoricSlot/tragaperras/palanca_arriba.png";
  }, 200);
}

// Función para obtener una imagen aleatoria de los símbolos
function obtenerImagenAleatoria() {
  var simboloAleatorio = Math.floor(Math.random() * simbolos.length);
  return simbolos[simboloAleatorio];
}

// Función para simular el giro
function girar() {
  var carril1 = document.getElementById("carril1");
  var carril2 = document.getElementById("carril2");
  var carril3 = document.getElementById("carril3");

  // Bloquear la interacción mientras gira
  bloquearGiro(true);

  function actualizarCarril(carril) {
    const imagenes = carril.querySelectorAll('img');
    imagenes.forEach(img => {
      img.src = obtenerImagenAleatoria();
    });
  }

  function girarCarril(carril, duracion) {
    var intervalo = setInterval(() => {
      actualizarCarril(carril);
    }, 50); // Cambiar imagen cada 50ms

    // Detener el giro
    setTimeout(() => {
      clearInterval(intervalo);
      actualizarCarril(carril);
    }, duracion); // Detener después de la duración específica
  }

  girarCarril(carril1, 2000);
  girarCarril(carril2, 3000);
  girarCarril(carril3, 4000);

  // Esperar a que termine el giro para comprobar el premio
  setTimeout(() => {
    comprobarPremio();
    bloquearGiro(false);
  }, 4500); // Después de 4 segundos, que es el tiempo del giro más largo
}

function comprobarPremio() {
  let apuesta = 25;
  let resultado = 0;
  let combinacion = "SIN_COMBINACION";

  // Obtener de elementos e imágenes de cada carril
  const carril1Elem = document.getElementById("carril1");
  const carril2Elem = document.getElementById("carril2");
  const carril3Elem = document.getElementById("carril3");

  const imagenCarril1 = Array.from(carril1Elem.querySelectorAll('img')).map(img => img.src);
  const imagenCarril2 = Array.from(carril2Elem.querySelectorAll('img')).map(img => img.src);
  const imagenCarril3 = Array.from(carril3Elem.querySelectorAll('img')).map(img => img.src);

  function obtenerNombreSimbolo(src) {
    return src.split("/").pop().split(".")[0];
  }

  // Comprobar una línea ganadora permitiendo solo 1 comodín
  function checkLine(sym1, sym2, sym3) {
    let countWild = 0;
    if (sym1 === "comodin") countWild++;
    if (sym2 === "comodin") countWild++;
    if (sym3 === "comodin") countWild++;
    if (countWild > 1) return false; // Máximo 1 comodín permitido
    if (countWild === 0 && sym1 === sym2 && sym2 === sym3) return true;
    if (countWild === 1) {
      if (sym1 === "comodin" && sym2 === sym3) return true;
      if (sym2 === "comodin" && sym1 === sym3) return true;
      if (sym3 === "comodin" && sym1 === sym2) return true;
    }
    return false;
  }

  // 5. Función auxiliar para obtener el símbolo base (el que no es comodín)
  function baseSymbol(sym1, sym2, sym3) {
    if (sym1 !== "comodin") return sym1;
    if (sym2 !== "comodin") return sym2;
    if (sym3 !== "comodin") return sym3;
    return "";
  }

  // 6. Función auxiliar para formar el string de la combinación
  function combinationString(sym1, sym2, sym3) {
    return sym1 + "-" + sym2 + "-" + sym3;
  }

  // 7. Comprobación del Jackpot: todas las posiciones iguales (no comodín)
  if (
      imagenCarril1[0] === imagenCarril2[0] && imagenCarril1[0] === imagenCarril3[0] &&
      imagenCarril1[1] === imagenCarril2[1] && imagenCarril1[1] === imagenCarril3[1] &&
      imagenCarril1[2] === imagenCarril2[2] && imagenCarril1[2] === imagenCarril3[2]
  ) {
    let simbolo = obtenerNombreSimbolo(imagenCarril1[0]);
    if (simbolo !== "comodin") {
      resultado = premios[simbolo] * 5;
      combinacion = simbolo + "-" + simbolo + "-" + simbolo;
      fichas += resultado;
      actualizarSaldo();

      // Aplica efecto visual a todas las imágenes
      const imagenesPremiadas = [
        ...carril1Elem.children,
        ...carril2Elem.children,
        ...carril3Elem.children
      ];
      imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
      setTimeout(() => {
          imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
          bloquearGiro(false);  // Desbloquea la palanca al terminar el efecto
      }, 3000);

      if (estaEnIngles()) {
        mostrarMensajePremio(`¡JACKPOT! PRIZE x5 You win ${resultado} tokens!`);
      } else {
        mostrarMensajePremio(`¡JACKPOT! PREMIO x5 Has ganado ${resultado} fichas!`);
      }
      sonidoPremio();
      registrarTiradaEnBD(apuesta, combinacion, resultado);
      registrarTiradaCavemanRunEnBD(apuesta, combinacion, resultado);
      return;
    }
  }

  // 8. Comprobación manual de líneas ganadoras (diagonales y filas)

  // a) Diagonal: carril1[0], carril2[1], carril3[2]
  let symA = obtenerNombreSimbolo(imagenCarril1[0]);
  let symB = obtenerNombreSimbolo(imagenCarril2[1]);
  let symC = obtenerNombreSimbolo(imagenCarril3[2]);
  if (checkLine(symA, symB, symC)) {
    let base = baseSymbol(symA, symB, symC);
    resultado = premios[base];
    combinacion = combinationString(symA, symB, symC);
    fichas += resultado;
    actualizarSaldo();

    [carril1Elem.children[0], carril2Elem.children[1], carril3Elem.children[2]]
      .forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      [carril1Elem.children[0], carril2Elem.children[1], carril3Elem.children[2]]
        .forEach(img => img.classList.remove("recuadro-premio"));
      bloquearGiro(false);
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${resultado} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${resultado} fichas!`);
    }
    sonidoPremio();
    registrarTiradaEnBD(apuesta, combinacion, resultado);
    registrarTiradaCavemanRunEnBD(apuesta, combinacion, resultado);
    return;
  }

  // b) Diagonal: carril1[2], carril2[1], carril3[0]
  symA = obtenerNombreSimbolo(imagenCarril1[2]);
  symB = obtenerNombreSimbolo(imagenCarril2[1]);
  symC = obtenerNombreSimbolo(imagenCarril3[0]);
  if (checkLine(symA, symB, symC)) {
    let base = baseSymbol(symA, symB, symC);
    resultado = premios[base];
    combinacion = combinationString(symA, symB, symC);
    fichas += resultado;
    actualizarSaldo();

    [carril1Elem.children[2], carril2Elem.children[1], carril3Elem.children[0]]
      .forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      [carril1Elem.children[2], carril2Elem.children[1], carril3Elem.children[0]]
        .forEach(img => img.classList.remove("recuadro-premio"));
      bloquearGiro(false);
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${resultado} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${resultado} fichas!`);
    }
    sonidoPremio();
    registrarTiradaEnBD(apuesta, combinacion, resultado);
    registrarTiradaCavemanRunEnBD(apuesta, combinacion, resultado);
    return;
  }

  // c) Fila 1: carril1[0], carril2[0], carril3[0]
  symA = obtenerNombreSimbolo(imagenCarril1[0]);
  symB = obtenerNombreSimbolo(imagenCarril2[0]);
  symC = obtenerNombreSimbolo(imagenCarril3[0]);
  if (checkLine(symA, symB, symC)) {
    let base = baseSymbol(symA, symB, symC);
    resultado = premios[base];
    combinacion = combinationString(symA, symB, symC);
    fichas += resultado;
    actualizarSaldo();

    [carril1Elem.children[0], carril2Elem.children[0], carril3Elem.children[0]]
      .forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      [carril1Elem.children[0], carril2Elem.children[0], carril3Elem.children[0]]
        .forEach(img => img.classList.remove("recuadro-premio"));
      bloquearGiro(false);
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${resultado} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${resultado} fichas!`);
    }
    sonidoPremio();
    registrarTiradaEnBD(apuesta, combinacion, resultado);
    registrarTiradaCavemanRunEnBD(apuesta, combinacion, resultado);
    return;
  }

  // d) Fila 2: carril1[1], carril2[1], carril3[1]
  symA = obtenerNombreSimbolo(imagenCarril1[1]);
  symB = obtenerNombreSimbolo(imagenCarril2[1]);
  symC = obtenerNombreSimbolo(imagenCarril3[1]);
  if (checkLine(symA, symB, symC)) {
    let base = baseSymbol(symA, symB, symC);
    resultado = premios[base];
    combinacion = combinationString(symA, symB, symC);
    fichas += resultado;
    actualizarSaldo();

    [carril1Elem.children[1], carril2Elem.children[1], carril3Elem.children[1]]
      .forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      [carril1Elem.children[1], carril2Elem.children[1], carril3Elem.children[1]]
        .forEach(img => img.classList.remove("recuadro-premio"));
      bloquearGiro(false);
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${resultado} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${resultado} fichas!`);
    }
    sonidoPremio();
    registrarTiradaEnBD(apuesta, combinacion, resultado);
    registrarTiradaCavemanRunEnBD(apuesta, combinacion, resultado);
    return;
  }

  // e) Fila 3: carril1[2], carril2[2], carril3[2]
  symA = obtenerNombreSimbolo(imagenCarril1[2]);
  symB = obtenerNombreSimbolo(imagenCarril2[2]);
  symC = obtenerNombreSimbolo(imagenCarril3[2]);
  if (checkLine(symA, symB, symC)) {
    let base = baseSymbol(symA, symB, symC);
    resultado = premios[base];
    combinacion = combinationString(symA, symB, symC);
    fichas += resultado;
    actualizarSaldo();

    [carril1Elem.children[2], carril2Elem.children[2], carril3Elem.children[2]]
      .forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      [carril1Elem.children[2], carril2Elem.children[2], carril3Elem.children[2]]
        .forEach(img => img.classList.remove("recuadro-premio"));
      bloquearGiro(false);
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${resultado} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${resultado} fichas!`);
    }
    sonidoPremio();
    registrarTiradaEnBD(apuesta, combinacion, resultado);
    registrarTiradaCavemanRunEnBD(apuesta, combinacion, resultado);
    return;
  }

  // 9. Sin premio: mostramos mensaje y registramos la tirada como pérdida, desbloqueamos inmediatamente.
  if (estaEnIngles()) {
    mostrarMensajePremio("¡Try again!");
  } else {
    mostrarMensajePremio("¡Intenta de nuevo!");
  }
  registrarTiradaEnBD(apuesta, "SIN_COMBINACION", 0);
}

// Función para mostrar el mensaje de premio
function mostrarMensajePremio(mensaje) {
  var mensajeElemento = document.getElementById("mensajePremio");
  mensajeElemento.textContent = mensaje;

  setTimeout(() => {
    mensajeElemento.textContent = "";
  }, 3000); 
}

function bloquearGiro(bloquear) {
  const palanca = document.getElementById("palanca");

  if (bloquear) {
    palanca.disabled = true;
  } else {
    palanca.disabled = false;
  }
}

function estaGirando() {
  const palanca = document.getElementById("palanca");
  return palanca.disabled;
}

// ACTUALIZAR SALDO EN LA PANTALLA
function actualizarSaldo() {
  if(estaEnIngles()){
    document.getElementById("dinero-actual").textContent = "MONEY: " + saldo + "€";
    document.getElementById("fichas-actuales").textContent = "CHIPS: " + fichas + "🎫";
  } else{
    document.getElementById("dinero-actual").textContent = "DINERO: " + saldo + "€";
    document.getElementById("fichas-actuales").textContent = "FICHAS: " + fichas + "🎫";
  }
}

// Función para cargar el saldo del usuario
function cargarSaldo() {
  const dni = localStorage.getItem("dni");

  if (dni) {
      $.ajax({
          type: "GET",
          url: `/usuario/obtenerSaldo/${dni}`,
          success: function(response) {
              saldo = parseFloat(response);
              actualizarSaldo();
          },
          error: function(error) {
          }
      });
  }
}

cargarSaldo();

// Función para actualizar el saldo en la base de datos
function actualizarSaldoEnBD(nuevoSaldo) {
  const dni = localStorage.getItem("dni");

  if (dni) {
      const usuarioDTO = {
          dni: dni,
          dineroUsuario: nuevoSaldo
      };

      $.ajax({
          url: '/usuario/actualizar',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(usuarioDTO),
          success: function(response) {
              cargarSaldo();
          },
          error: function(xhr, status, error) {
          }
      });
  }
}

// Función que convierte las fichas en dinero y actualiza el saldo
function convertirFichasADinero() {
  if (fichas > 0) {
      const cantidadDinero = fichas / 50;
      saldo += cantidadDinero; 
      fichas = 0;

      actualizarSaldoEnBD(saldo);
      actualizarSaldo();
  }
}

window.addEventListener("beforeunload", function(event) {
  if (fichas > 0) {
      convertirFichasADinero();
  }
});

/* TRADUCIR A INGLES */
i18next.init({
  lng: 'es',  // Idioma por defecto
  resources: {
    es: {
      translation: {
        meterDinero: "Meter dinero",
        sacarDinero: "Sacar dinero",
        convertirDinero: "Convertir a dinero",
        convertirFichas: "Convertir a fichas",
        dineroActual: "DINERO: 0€",
        fichasActuales: "FICHAS: 0🎫",
        mensajePremio: "",
        idioma: "Idioma",
        volumenPrincipal: "Volumen principal",
        blancoYNegro: "Modo de color",
        cerrar: "Cerrar",
        introducirDineroLabel: "Introduce dinero",
        aceptar: "Aceptar",
        cerrarModal: "Cerrar",
        h2Manual: "Manual de la Tragaperras",
        pManual: "¡Bienvenido! Aquí están las combinaciones ganadoras y cómo lograrlas:",
        jackpotTitle: "1. Jackpot",
        jackpotDescription: "Cuando todos los símbolos en los tres carriles sean iguales, ¡obtienes el JACKPOT!",
        horizontalLineTitle: "2. Línea Horizontal",
        horizontalLineDescription: "Una fila horizontal con los mismos símbolos en los tres carriles es ganadora.",
        diagonalLineTitle: "3. Línea Diagonal",
        diagonalLineDescription: "Una línea diagonal con los mismos símbolos es una combinación ganadora.",
        tryAgainTitle: "4. Intenta de nuevo",
        tryAgainDescription: "Si no logras ninguna combinación ganadora, ¡sigue intentándolo!"

      }
    },
    en: {
      translation: {
        meterDinero: "Deposit money",
        sacarDinero: "Withdraw money",
        convertirFichas: "Convert to chips",
        convertirDinero: "Convert to money",
        dineroActual: "MONEY: 0€",
        fichasActuales: "CHIPS: 0🎫",
        mensajePremio: "",
        idioma: "Language",
        volumenPrincipal: "Main volume",
        blancoYNegro: "Color mode",
        cerrar: "Close",
        introducirDineroLabel: "Enter money",
        aceptar: "Accept",
        cerrarModal: "Close",
        h2Manual: "Slot Machine Manual",
        pManual: "Welcome! Here are the winning combinations and how to achieve them:",
        jackpotTitle: "1. Jackpot",
        jackpotDescription: "When all symbols on the three reels are the same, you get the JACKPOT!",
        horizontalLineTitle: "2. Horizontal Line",
        horizontalLineDescription: "A horizontal line with the same symbols on the three reels is a winner.",
        diagonalLineTitle: "3. Diagonal Line",
        diagonalLineDescription: "A diagonal line with the same symbols is a winning combination.",
        tryAgainTitle: "4. Try Again",
        tryAgainDescription: "If you don't get a winning combination, keep trying!"
      }
    }
  }
},
function(err, t) {
  // ACTUALIZAR TRADUCCIONES
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
    if (el.tagName.toLowerCase() === 'input') {
      el.value = t(key);
    }
  });
});

// SI ESTA EN INGLES DEVUELVE TRUE, SI ESTA EN ESPAÑOL DEVUELVE FALSE
function estaEnIngles() {
  return i18next.language === 'en';
}

function traducir() {
  const nuevoIdioma = i18next.language === 'es' ? 'en' : 'es';
  
  i18next.changeLanguage(nuevoIdioma, function(err, t) {
    // Actualizamos los elementos con las traducciones después de cambiar el idioma
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = t(key);
      if (el.tagName.toLowerCase() === 'input') {
        el.value = t(key);
      }
    });

    // CAMBIAR ICONO DEPENDIENDO DEL IDIOMA
    if (estaEnIngles()) {
      document.getElementById('icono-idioma').src = './assets/prehistoricSlot/ajustes/ingles.png';
      document.getElementById("cartel-premios").src = "./assets/prehistoricSlot/premios/cartel-premios-ingles.png";
    } else {
      document.getElementById('icono-idioma').src = './assets/prehistoricSlot/ajustes/español.png';
      document.getElementById("cartel-premios").src = "./assets/prehistoricSlot/premios/cartel-premios-español.png";
    }
  });
}

// FUNCION PARA COMPROBAR EN QUE IDIOMA ESTA
function estaEnIngles() {
  return i18next.language === 'en';
}