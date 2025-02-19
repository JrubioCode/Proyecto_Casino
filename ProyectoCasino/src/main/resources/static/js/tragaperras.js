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
    saldo += cantidadDinero;
    actualizarSaldo();
    cerrarModal(document.getElementById("modal-meter-dinero"));
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
  } else if (cantidadDinero > saldo) {
    comprobacion.textContent = estaEnIngles() ? "Not enough money" : "No tienes suficiente saldo.";
    comprobacion.style.color = "red";
    setTimeout(() => {
      comprobacion.textContent = "";
    }, 1500);
  } else {
    saldo -= cantidadDinero;
    actualizarSaldo();
    cerrarModal(document.getElementById("modal-retirar-dinero"));
  }

  document.getElementById("input-retirar-dinero").value = '';
});

document.getElementById("boton-cerrar-retirar-dinero-modal").addEventListener("click", function () {
  document.getElementById("input-retirar-dinero").value = '';
  cerrarModal(document.getElementById("modal-retirar-dinero"));
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
  } else if (cantidadEuros > saldo) {
    comprobacion.textContent = estaEnIngles() ? "Not enough money" : "No tienes suficiente saldo.";
    comprobacion.style.color = "red";
    setTimeout(() => {
      comprobacion.textContent = "";
    }, 1500);
  } else {
    const cantidadFichas = cantidadEuros * 100;
    saldo -= cantidadEuros;
    fichas += cantidadFichas;
    actualizarSaldo();
    cerrarModal(document.getElementById("modal-conversion-fichas"));
  }

  // Limpiar el campo de entrada después de procesar
  document.getElementById("input-cantidad-conversion-fichas").value = '';
});

// Convertir fichas a saldo
document.getElementById("boton-convertir-saldo").addEventListener("click", function () {
  const cantidadFichas = parseInt(document.getElementById("input-cantidad-conversion-saldo").value);
  const comprobacion = document.getElementById("comprobacion-convertir-a-dinero");

  if (cantidadFichas <= 0 || isNaN(cantidadFichas)) {
    comprobacion.textContent = estaEnIngles() ? "Please introduce a correct quantity" : "Por favor, ingresa una cantidad válida.";
    comprobacion.style.color = "red";
    setTimeout(() => {
      comprobacion.textContent = "";
    }, 1500);
  } else if (cantidadFichas > fichas) {
    comprobacion.textContent = estaEnIngles() ? "Not enough tokens" : "No tienes suficientes fichas.";
    comprobacion.style.color = "red";
    setTimeout(() => {
      comprobacion.textContent = "";
    }, 1500);
  } else {
    const cantidadDinero = cantidadFichas / 100;
    fichas -= cantidadFichas;
    saldo += cantidadDinero;
    actualizarSaldo();
    cerrarModal(document.getElementById("modal-conversion-saldo"));
  }

  // Limpiar el campo de entrada después de procesar
  document.getElementById("input-cantidad-conversion-saldo").value = '';
});

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
  grupoCavernicolas: 1000
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
  bloquearInteraccion(true);

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
    bloquearInteraccion(false);
  }, 4500); // Después de 4 segundos, que es el tiempo del giro más largo
}

// Función para comprobar el premio
function comprobarPremio() {

  // Comprobamos JACPOT
  var carril1 = document.getElementById("carril1");
  var carril2 = document.getElementById("carril2");
  var carril3 = document.getElementById("carril3");

  var imagenCarril1 = Array.from(carril1.querySelectorAll('img')).map(img => img.src);
  var imagenCarril2 = Array.from(carril2.querySelectorAll('img')).map(img => img.src);
  var imagenCarril3 = Array.from(carril3.querySelectorAll('img')).map(img => img.src);

  // Comprobación de Jackpot (todas las imágenes deben ser iguales en todos los carriles y en todas las posiciones)
  if (imagenCarril1[0] === imagenCarril2[0] && imagenCarril1[0] === imagenCarril3[0] &&
      imagenCarril1[1] === imagenCarril2[1] && imagenCarril1[1] === imagenCarril3[1] &&
      imagenCarril1[2] === imagenCarril2[2] && imagenCarril1[2] === imagenCarril3[2]) {

      var simbolo = imagenCarril1[0].split("/").pop().split(".")[0];  // Extraemos el nombre del símbolo
      var premioJackpot = premios[simbolo] * 5; 
      
      fichas += premioJackpot;
      actualizarSaldo();

      // Aplicar efecto a todas las imágenes premiadas
      const imagenesPremiadas = [
          carril1.children[0], carril1.children[1], carril1.children[2],
          carril2.children[0], carril2.children[1], carril2.children[2],
          carril3.children[0], carril3.children[1], carril3.children[2]
      ];

      imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
      setTimeout(() => {
          imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
      }, 3000);

      if (estaEnIngles()) {
        mostrarMensajePremio(`¡JACKPOT! PRIZE x5 You win ${premioJackpot} tokens!`);
      } else {
        mostrarMensajePremio(`¡JACKPOT! PREMIO x5 Has ganado ${premioJackpot} fichas!`);
      }
      sonidoPremio();
      return;  // Terminamos la ejecución si se detecta el Jackpot
  }

    // Definimos los carriles
    var carril1 = document.getElementById("carril1");
    var carril2 = document.getElementById("carril2");
    var carril3 = document.getElementById("carril3");
  
    var imagenCarril1 = Array.from(carril1.querySelectorAll('img')).map(img => img.src);
    var imagenCarril2 = Array.from(carril2.querySelectorAll('img')).map(img => img.src);
    var imagenCarril3 = Array.from(carril3.querySelectorAll('img')).map(img => img.src);
  
    // *** DIAGONAL SUPERIOR-IZQUIERDA A INFERIOR-DERECHA ***
    if (imagenCarril1[0] === imagenCarril2[1] && imagenCarril1[0] === imagenCarril3[2]) {
      var simbolo = imagenCarril1[0].split("/").pop().split(".")[0];
      var premio = premios[simbolo];
  
      fichas += premio;
      actualizarSaldo();
  
      const imagenesPremiadas = [
        carril1.children[0],
        carril2.children[1],
        carril3.children[2],
      ];
  
      imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
      setTimeout(() => {
        imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
      }, 3000);
  
      if (estaEnIngles()) {
        mostrarMensajePremio(`DIAGONAL PRIZE! You win ${premio} tokens!`);
      } else {
        mostrarMensajePremio(`¡PREMIO DIAGONAL! Has ganado ${premio} fichas!`);
      }
      sonidoPremio();
      return;
    }
  
    // *** DIAGONAL INFERIOR-IZQUIERDA A SUPERIOR-DERECHA ***
    if (imagenCarril1[2] === imagenCarril2[1] && imagenCarril1[2] === imagenCarril3[0]) {
      var simbolo = imagenCarril1[2].split("/").pop().split(".")[0];
      var premio = premios[simbolo];
  
      fichas += premio;
      actualizarSaldo();
  
      const imagenesPremiadas = [
        carril1.children[2],
        carril2.children[1],
        carril3.children[0],
      ];
  
      imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
      setTimeout(() => {
        imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
      }, 3000);
  
      if (estaEnIngles()) {
        mostrarMensajePremio(`DIAGONAL PRIZE! You win ${premio} tokens!`);
      } else {
        mostrarMensajePremio(`¡PREMIO DIAGONAL! Has ganado ${premio} fichas!`);
      }
      sonidoPremio();
      return;
    }

    // Comprobamos las imágenes de la segunda posición de cada carril (1,1,1)
    if (imagenCarril1[1] === imagenCarril2[1] && imagenCarril1[1] === imagenCarril3[1]) {
      var simbolo = imagenCarril1[1].split("/").pop().split(".")[0];  // Extraemos el nombre del símbolo
      var premio = premios[simbolo];  // Calculamos el premio

      fichas += premio;  // Sumamos el premio al saldo
      actualizarSaldo();  // Actualizamos el saldo visualmente

      // Aplicar efecto a las imágenes premiadas
      const imagenesPremiadas = [
        carril1.children[1],
        carril2.children[1],
        carril3.children[1],
      ];

      imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
      setTimeout(() => {
        imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
      }, 3000);

      if (estaEnIngles()) {
        mostrarMensajePremio(`3 IMAGES PRIZE! You win ${premio} fichas!`);
      } else {
        mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${premio} fichas!`);
      }
      sonidoPremio();
      return;  // Terminamos la ejecución si se detecta el premio
    }

  // Comprobamos las imágenes de la primera posición de cada carril (0,0,0)
  if (imagenCarril1[0] === imagenCarril2[0] && imagenCarril1[0] === imagenCarril3[0]) {
    var simbolo = imagenCarril1[0].split("/").pop().split(".")[0];  // Extraemos el nombre del símbolo
    var premio = premios[simbolo];  // Calculamos el premio

    fichas += premio;  // Sumamos el premio al saldo
    actualizarSaldo();  // Actualizamos el saldo visualmente

    // Aplicar efecto a las imágenes premiadas
    const imagenesPremiadas = [
      carril1.children[0],
      carril2.children[0],
      carril3.children[0],
    ];

    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${premio} fichas!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${premio} fichas!`);
    }
    sonidoPremio();
    return;  // Terminamos la ejecución si se detecta el premio
  }

  // Obtener las imágenes de cada carril
  var carril1 = document.getElementById("carril1");
  var carril2 = document.getElementById("carril2");
  var carril3 = document.getElementById("carril3");

  var imagenCarril1 = Array.from(carril1.querySelectorAll('img')).map(img => img.src);
  var imagenCarril2 = Array.from(carril2.querySelectorAll('img')).map(img => img.src);
  var imagenCarril3 = Array.from(carril3.querySelectorAll('img')).map(img => img.src);

  // Comprobamos las imágenes de la segunda posición de cada carril (1,1,1)
  if (imagenCarril1[1] === imagenCarril2[1] && imagenCarril1[1] === imagenCarril3[1]) {
    var simbolo = imagenCarril1[1].split("/").pop().split(".")[0];  // Extraemos el nombre del símbolo
    var premio = premios[simbolo];  // Calculamos el premio
  
    fichas += premio;  // Sumamos el premio al saldo
    actualizarSaldo();  // Actualizamos el saldo visualmente
  
    // Aplicar efecto a las imágenes premiadas
    const imagenesPremiadas = [
       carril1.children[1],
      carril2.children[1],
      carril3.children[1],
    ];
  
    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);
  
    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${premio} fichas!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${premio} fichas!`);
    }
    sonidoPremio();
    return;  // Terminamos la ejecución si se detecta el premio
  }

  // Comprobamos las imágenes de la primera posición de cada carril (0,0,0)
  if (imagenCarril1[0] === imagenCarril2[0] && imagenCarril1[0] === imagenCarril3[0]) {
    var simbolo = imagenCarril1[0].split("/").pop().split(".")[0];  // Extraemos el nombre del símbolo
    var premio = premios[simbolo];  // Calculamos el premio

    fichas += premio;
    actualizarSaldo();

    // Aplicar efecto a las imágenes premiadas
    const imagenesPremiadas = [
      carril1.children[0],
      carril2.children[0],
      carril3.children[0],
    ];

    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${premio} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${premio} fichas!`);
    }
    sonidoPremio();
    return;  // Terminamos la ejecución si se detecta el premio
  }

  // Comprobamos las imágenes de la tercera posición de cada carril (2,2,2)
  if (imagenCarril1[2] === imagenCarril2[2] && imagenCarril1[2] === imagenCarril3[2]) {
    var simbolo = imagenCarril1[2].split("/").pop().split(".")[0];  // Extraemos el nombre del símbolo
    var premio = premios[simbolo];  // Calculamos el premio

    fichas += premio;
    actualizarSaldo();

    // Aplicar efecto a las imágenes premiadas
    const imagenesPremiadas = [
      carril1.children[2],
      carril2.children[2],
      carril3.children[2],
    ];

    imagenesPremiadas.forEach(img => img.classList.add("recuadro-premio"));
    setTimeout(() => {
      imagenesPremiadas.forEach(img => img.classList.remove("recuadro-premio"));
    }, 3000);

    if (estaEnIngles()) {
      mostrarMensajePremio(`3 IMAGES PRIZE! You win ${premio} tokens!`);
    } else {
      mostrarMensajePremio(`¡PREMIO DE 3 IMÁGENES! Has ganado ${premio} fichas!`);
    }
    sonidoPremio();
    return;  // Terminamos la ejecución si se detecta el premio
  }

  // Si no hay premio, mostramos el mensaje de "Intenta de nuevo"
  if (estaEnIngles()) {
    mostrarMensajePremio("¡Try again!");
  } else {
    mostrarMensajePremio("¡Intenta de nuevo!");
  }
}

// Función para mostrar el mensaje de premio
function mostrarMensajePremio(mensaje) {
  var mensajeElemento = document.getElementById("mensajePremio");
  mensajeElemento.textContent = mensaje;

  setTimeout(() => {
    mensajeElemento.textContent = "";
  }, 3000); 
}

// Función para bloquear o desbloquear la interacción (palanca o tecla espacio)
function bloquearInteraccion(bloquear) {
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