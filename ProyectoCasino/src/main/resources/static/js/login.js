function comprobaciones(event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();
  
    if (comprobarUsuario() && comprobarPasswd()) {
      // Obtener los valores de los campos de usuario y contraseña
      const usuario = $("#usuario").val();
      const pwd = $("#contraseña").val();
  
      // Realizar una solicitud AJAX GET al UsuarioController
      $.ajax({
        type: "GET",
        url: `/usuario/comprobarUsuario/${usuario}/${pwd}`, // Endpoint configurado para validar el usuario
        success: function (response) {
          console.log("Respuesta del servidor (GET):", response);
  
          // Manejar las posibles respuestas del servidor
          if (response === "OK") {
            console.log("Usuario autenticado correctamente. Redirigiendo al lobby...");
            window.location.pathname = "/lobby";
          } else if (response === "404") {
            mostrarModal("Usuario no encontrado.");
          } else if (response === "Contraseña incorrecta") {
            mostrarModal("Contraseña incorrecta.");
          } else {
            mostrarModal("Respuesta inesperada del servidor: " + response);
          }
        },
        error: function (error) {
          console.error("Error en la solicitud AJAX (GET):", error);
          mostrarModal("Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo.");
        },
      });
    }
}  

// Comprobar usuario
function comprobarUsuario() {
    const usuario = document.getElementById("usuario").value;
    const comprobacion = document.getElementById("comprobacionUsuario");
  
    if (usuario.length > 0) {
        return true;
    } else {
        comprobacion.textContent = "Por favor, introduce un nombre de usuario";
        comprobacion.style.color = "red";
        setTimeout(() => {
            comprobacion.textContent = "";
        }, 3000);
        return false;
    }
}

// Comprobar contraseña
function comprobarPasswd() {
    const passwd1 = document.getElementById("contraseña").value;
    const comprobacion = document.getElementById("comprobacionPasswd");
  
    if (passwd1.length >= 8) {
        return true;
    } else {
        comprobacion.textContent = "La contraseña debe tener al menos 8 caracteres";
        comprobacion.style.color = "red";
        setTimeout(() => {
            comprobacion.textContent = "";
        }, 3000);
        return false;
    }
}

// Cerrar modal al hacer clic en el botón de cerrar
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
});

// Mostrar modal general
function mostrarModal(mensaje) {
    const modal = document.getElementById("modal");
    const mensajeModal = document.getElementById("mensajeModal");
    mensajeModal.innerText = mensaje;
    modal.style.display = "flex";
}
  
// Cerrar modal al hacer clic fuera del contenido del modal
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
});