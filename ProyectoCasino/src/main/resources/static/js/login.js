function comprobaciones(event) {
  event.preventDefault();

  if (comprobarUsuario() && comprobarPasswd()) {
    const userName = $("#usuario").val();
    const userPassword = $("#contraseña").val();

    $.ajax({
      type: "GET",
      url: `/usuario/autenticar/${userName}/${userPassword}`,
      // No especificamos dataType para permitir tanto texto como JSON
      success: function (response) {
        // Si la respuesta es de tipo string, es un mensaje de error
        if (typeof response === "string") {
          mostrarModal(response);
        } else if (typeof response === "object") {
          // Se asume que es un objeto con los datos del usuario
          localStorage.setItem("dni", response.dni);
          localStorage.setItem("esVip", response.esVip);

          // Redirigir a /lobby con el parámetro dni
          window.location.href = `/lobby?dni=${response.dni}`;
        }
      },
      error: function (error) {
        mostrarModal("Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo.");
      }
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