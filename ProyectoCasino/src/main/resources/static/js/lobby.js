// Reloj
function actualizarReloj() {
    const ahora = new Date();
    const reloj = ahora.toLocaleTimeString();
    document.getElementById('reloj').textContent = reloj;
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carrusel-slide');

function moverDerecha() {
    currentSlide = (currentSlide + 1) % slides.length; // Mueve a la siguiente imagen
    updateSlidePosition();
}

function moverIzquierda() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Mueve a la imagen anterior
    updateSlidePosition();
}

function updateSlidePosition() {
    const carruselContainer = document.querySelector('.contenedor-carrusel');
    const newTransformValue = -currentSlide * 100; // Cambia la posición
    carruselContainer.style.transform = `translateX(${newTransformValue}%)`;
}
