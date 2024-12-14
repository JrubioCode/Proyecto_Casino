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
musicaFondo.volume = 0; // Volumen inicial

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
                    console.error("Error al obtener el saldo:", error);
                }
            });
        }
    }

    document.getElementById("input-introducir-dinero").value = '';
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
                    console.error("Error al obtener el saldo:", error);
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

    if (cantidadEuros <= 0 || isNaN(cantidadEuros)) {
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
                    if (cantidadEuros > saldoActual) {
                        comprobacion.textContent = estaEnIngles() ? "Not enough money" : "No tienes suficiente saldo.";
                        comprobacion.style.color = "red";
                        setTimeout(() => {
                            comprobacion.textContent = "";
                        }, 1500);
                    } else {
                        const cantidadFichas = cantidadEuros * 100;
                        fichas += cantidadFichas;
                        const nuevoSaldo = saldoActual - cantidadEuros;
                        actualizarSaldoEnBD(nuevoSaldo);
                        actualizarSaldo();
                        cerrarModal(document.getElementById("modal-conversion-fichas"));
                    }
                },
                error: function(error) {
                    console.error("Error al obtener el saldo:", error);
                }
            });
        }
    }

    document.getElementById("input-cantidad-conversion-fichas").value = '';
});

// Convertir fichas a saldo
document.getElementById("boton-convertir-saldo").addEventListener("click", function () {
  const cantidadFichas = parseInt(document.getElementById("input-cantidad-conversion-saldo").value);
  const comprobacion = document.getElementById("comprobacion-convertir-a-dinero");

  if (cantidadFichas <= 0 || isNaN(cantidadFichas)) {
      // Verificar que se introduzca una cantidad válida
      comprobacion.textContent = estaEnIngles() ? "Please introduce a correct quantity" : "Por favor, ingresa una cantidad válida.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
  } else if (cantidadFichas > fichas) {
      // Verificar que haya suficientes fichas para la conversión
      comprobacion.textContent = estaEnIngles() ? "Not enough chips" : "No tienes suficientes fichas.";
      comprobacion.style.color = "red";
      setTimeout(() => {
          comprobacion.textContent = "";
      }, 1500);
  } else {
      // Convertir fichas a dinero y actualizar el saldo
      const cantidadDinero = cantidadFichas / 100;
      const nuevoSaldo = saldo + cantidadDinero;
      
      // Actualizar el saldo y las fichas
      fichas -= cantidadFichas;
      actualizarSaldoEnBD(nuevoSaldo);
      actualizarSaldo();
      
      cerrarModal(document.getElementById("modal-conversion-saldo"));
  }

  // Limpiar el campo de entrada
  document.getElementById("input-cantidad-conversion-saldo").value = '';
});

// ACTUALIZAR SALDO EN LA PANTALLA
function actualizarSaldo() {
    if (estaEnIngles()) {
        document.getElementById("dinero-actual").textContent = "MONEY: " + saldo + "€";
        document.getElementById("fichas-actuales").textContent = "CHIPS: " + fichas + "🎫";
    } else {
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
                console.error("Error al obtener el saldo:", error);
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
            url: '/saldo/actualizar',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(usuarioDTO),
            success: function(response) {
                console.log("Saldo actualizado en la base de datos:", response);
                cargarSaldo();
            },
            error: function(xhr, status, error) {
                console.error("Error al actualizar el saldo:", error);
            }
        });
    }
}

// Función que convierte las fichas en dinero y actualiza el saldo
function convertirFichasADinero() {
  if (fichas > 0) {
      const cantidadDinero = fichas / 100;
      saldo += cantidadDinero; 
      fichas = 0;

      actualizarSaldoEnBD(saldo);
      actualizarSaldo();
  }
}

// Evento para detectar cuando el usuario intente salir o recargar la página
window.addEventListener("beforeunload", function(event) {
  if (fichas > 0) {
      convertirFichasADinero();
  }
});

// Ejemplo de datos simulados
const historialTiradas = [
  { id: 1, jugador: 'Jugador1', apuesta: 10, multiplicador: 2.5, premio: 25 },
  { id: 2, jugador: 'Jugador2', apuesta: 15, multiplicador: 1.8, premio: 27 },
  { id: 3, jugador: 'Jugador3', apuesta: 20, multiplicador: 0.5, premio: 0 }, // Sin ganancia
  { id: 4, jugador: 'Jugador4', apuesta: 5, multiplicador: 4.2, premio: 21 },
  { id: 5, jugador: 'Jugador5', apuesta: 8, multiplicador: 3.0, premio: 24 },
];

const mejoresJugadas = historialTiradas
  .filter((jugada) => jugada.premio > 0) // Solo jugadas con ganancias
  .sort((a, b) => b.premio - a.premio); // Ordenadas de mayor a menor premio

// Función para renderizar tablas
function renderHistorialTiradas() {
  const tbody = document.getElementById('historial-tiradas');
  tbody.innerHTML = '';
  historialTiradas.forEach((tirada) => {
    const row = `
      <tr>
        <td>${tirada.id}</td>
        <td>${tirada.jugador}</td>
        <td>$${tirada.apuesta}</td>
        <td>${tirada.multiplicador}x</td>
        <td>$${tirada.premio}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function renderMejoresJugadas() {
  const tbody = document.getElementById('mejores-jugadas');
  tbody.innerHTML = '';
  mejoresJugadas.forEach((jugada) => {
    const row = `
      <tr>
        <td>${jugada.jugador}</td>
        <td>$${jugada.premio}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Cambiar entre pestañas
document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', () => {
    // Cambiar pestaña activa
    document.querySelector('.tab-button.active').classList.remove('active');
    button.classList.add('active');

    // Mostrar sección correspondiente
    document.querySelector('.estadistica-section.active').classList.remove('active');
    const targetSection = document.getElementById(button.dataset.target);
    targetSection.classList.add('active');
  });
});

// Inicialización
renderHistorialTiradas();
renderMejoresJugadas();

























document.addEventListener("DOMContentLoaded", () => {
  const inputApuesta = document.getElementById("apuesta");
  const btnMenos = document.getElementById("btn-menos");
  const btnMas = document.getElementById("btn-mas");
  const botonesApuestaRapida = document.querySelectorAll(".btn-apuesta-rapida");
  const btnCorrer = document.getElementById("btn-correr");
  const fichasDisplay = document.getElementById("fichas-actuales");
  const multiplicadorDisplay = document.getElementById("multiplicador");

  let corriendo = false;
  let multiplicador = 0;
  let intervaloMulti;
  let apuesta = 0;

  // Función para manejar errores
  function mostrarError(mensajeError) {
    alert(mensajeError);
  }

  // Función para validar la apuesta
  function validarApuesta(value) {
    if (value <= 0) {
      mostrarError("Debes apostar al menos 1 ficha.");
      return false;
    }
    if (value > fichas) {
      mostrarError("No tienes suficientes fichas para esta apuesta.");
      return false;
    }
    return true;
  }

  function actualizarFichas() {
    fichasDisplay.textContent = `FICHAS: ${fichas} 🎫`;
  }

  function actualizarMultiplicador() {
    multiplicador += 0.1;
    multiplicadorDisplay.textContent = `X${multiplicador.toFixed(1)}`; // Muestra el multiplicador con un decimal
  }

  // Ajustar apuesta con los botones
  btnMenos.addEventListener("click", () => {
    const currentApuesta = parseInt(inputApuesta.value, 10) || 0;
    if (currentApuesta > 0) {
      inputApuesta.value = currentApuesta - 1;
    }
  });

  btnMas.addEventListener("click", () => {
    const currentApuesta = parseInt(inputApuesta.value, 10) || 0;
    inputApuesta.value = currentApuesta + 1;
  });

  // Manejar las apuestas rápidas
  botonesApuestaRapida.forEach((button) => {
    button.addEventListener("click", () => {
      const apuestaRapida = parseInt(button.value, 10);
      inputApuesta.value = apuestaRapida;
    });
  });

  // Manejar el clic en correr
  btnCorrer.addEventListener("click", () => {
    if (!corriendo) {
      apuesta = parseInt(inputApuesta.value, 10) || 0;

      // Validar la apuesta antes de permitir jugar
      if (!validarApuesta(apuesta)) {
        return;
      }

      fichas -= apuesta;
      actualizarFichas();

      startRunning();
    } else {
      stopRunning();
    }
  });

  function startRunning() {
    const fondo = document.querySelector(".videoFondo");
    const cavernicola = document.querySelector(".cavernicolaCorriendo");

    cavernicola.src = "./assets/cavemanRun/cavernicola-corriendo.gif";

    fondo.play();

    // Cambiar el botón a "Parar"
    btnCorrer.value = "Parar";
    btnCorrer.style.backgroundColor = "red";
    btnCorrer.style.color = "white";

    corriendo = true;

    multiplicador = 1;
    multiplicadorDisplay.textContent = `X${multiplicador.toFixed(1)}`;

    // Iniciar el intervalo para actualizar el multiplicador cada segundo
    intervaloMulti = setInterval(actualizarMultiplicador, 1000);
  }

  // Función para detener el movimiento
  function stopRunning() {
    const fondo = document.querySelector(".videoFondo");
    const cavernicola = document.querySelector(".cavernicolaCorriendo");

    cavernicola.src = "./assets/cavemanRun/cavernicola-parado.png";

    fondo.pause();

    btnCorrer.value = "Correr";
    btnCorrer.style.backgroundColor = "";
    btnCorrer.style.color = "";

    corriendo = false;

    // Detener el intervalo del multiplicador cuando se detiene el juego
    clearInterval(intervaloMulti);

    const ganancia = apuesta * multiplicador;
    fichas += Math.round(ganancia);
    actualizarFichas();
  }
  actualizarFichas();
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
      document.getElementById('icono-idioma').src = './assets/ajustes/ingles.png';
      document.getElementById("cartel-premios").src = "./assets/premios/cartel-premios-ingles.png";
    } else {
      document.getElementById('icono-idioma').src = './assets/ajustes/español.png';
      document.getElementById("cartel-premios").src = "./assets/premios/cartel-premios-español.png";
    }
  });
}

// FUNCION PARA COMPROBAR EN QUE IDIOMA ESTA
function estaEnIngles() {
  return i18next.language === 'en';
}