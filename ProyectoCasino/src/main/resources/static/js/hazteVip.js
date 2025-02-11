const btn = document.getElementById("submit");
const form = document.getElementById("form");

btn.addEventListener("click", function (event) {
  event.preventDefault();

  // Comprobaciones
  if (comprobarNombre() && comprobarApellido1() && comprobarApellido2() && comprobarEdad() && comprobarUsuario() && comprobarEmail() && comprobarPasswd() &&
  comprobarDNI() && comprobarNumero() && comprobarNumeroTarjeta() && comprobarCaducidad() && comprobarCVC()) {
    // Comprobar si se han aceptado los términos
    if (!aceptarTerminos()) {
      comprobarTerminos();
      return;
    } else {
      // Crear objeto con los datos del formulario
      const formData = {
        dni: document.getElementById("dni").value,
        userName: document.getElementById("usuario").value,
        userPassword: document.getElementById("contraseña").value,
        nombre: document.getElementById("nombre").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        fechaNacimiento: document.getElementById("nacimiento").value,
        email: document.getElementById("email").value,
        numeroTelefono: document.getElementById("numero").value,
        numeroTarjeta: document.getElementById("numeroTarjeta").value,
        Caducidad: document.getElementById("caducidad").value,
        CVC: document.getElementById("cvc").value
      };

      // Realizar la solicitud AJAX para guardar los datos
      $.ajax({
        type: "POST",
        url: "/usuario/registrarVIP",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {

          if (response.includes("Error: El DNI ya está registrado")) {
            mostrarModal("El DNI ya está registrado. Por favor, verifica los datos.");
          } else if (response.includes("Error: El nombre de usuario ya está en uso")) {
            mostrarModal("El nombre de usuario ya está en uso. Por favor, elige otro.");
          } else if (response.includes("USUARIO REGISTRADO CORRECTAMENTE")) {
            mostrarModal("¡Usuario registrado correctamente!");

            // Restablecer el formulario
            form.reset();
            btn.textContent = "Registrar";

            setTimeout(() => {
              // EmailJS
              btn.textContent = "Registrando...";

              const serviceID = "service_5gckq7i";
              const templateID = "template_albjoye";

              // Envía el formulario con emailjs
              emailjs
                .sendForm(serviceID, templateID, form)
                .then(() => {
                  btn.textContent = "Registrar";
                  form.reset();
                  mostrarModal("¡Registrado!");

                  // Redirigir al login
                  window.location.href = "./../login/login.html";
                })
                .catch((err) => {
                  btn.textContent = "Registrar";
                  mostrarModal("Error: " + JSON.stringify(err));
                });
              // Redirigir al index (login)
              window.location.pathname = "/";
            }, 3000);
          } else {
            mostrarModal("Respuesta inesperada del servidor: " + response);
          }
        },
        error: function (error) {
          console.error("Error en la solicitud AJAX:", error);
          mostrarModal("Error al registrar el usuario: " + error.responseText);
          btn.textContent = "Registrar";
        },
      });
    }
  }
});

// Comprobar si se han aceptado los términos
function aceptarTerminos() {
  const checkboxTerminos = document.getElementById("terminos");
  return checkboxTerminos.checked;
}

// Mostrar modal de términos y condiciones
function comprobarTerminos() {
  const modal = document.getElementById("modalTerminos");
  modal.style.display = "flex";
}

// Cerrar modal al hacer clic en el botón de cerrar
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido del modal
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }

  // Cerrar modal de términos al hacer clic fuera de él
  const modalTerminos = document.getElementById("modalTerminos");
  if (event.target === modalTerminos) {
    cerrarModal();
  }
});

// Aceptar términos en el modal de términos
document.getElementById("aceptarTerminos").addEventListener("click", function () {
    const checkboxTerminos = document.getElementById("terminos");
    checkboxTerminos.checked = true;
    cerrarModal();
  });

// Ocultar el modal de términos
function cerrarModal() {
  const modal = document.getElementById("modalTerminos");
  modal.style.display = "none";
}

// Comprobar usuario
function comprobarUsuario() {
  const usuario = document.getElementById("usuario").value;
  const comprobacion = document.getElementById("comprobacionUsuario");

  if (usuario.length > 0) {
    comprobacion.textContent = "Usuario disponible";
    comprobacion.style.color = "green";
    comprobacion.style.fontSize = "12px";
    return true;
  } else {
    comprobacion.textContent = "Por favor, introduce un nombre de usuario";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
    return false;
  }
}

// Comprobar email
function comprobarEmail() {
  const email = document.getElementById("email").value;
  const comprobacion = document.getElementById("comprobacionEmail");
  const primeraLetra = /^[a-zA-Z0-9]/;

  if (primeraLetra.test(email) && (email.includes("@gmail") || email.includes("@hotmail")) && email.endsWith(".com")) {
    comprobacion.textContent = "Correo electrónico correcto";
    comprobacion.style.color = "green";
    comprobacion.style.fontSize = "12px";
    return true;
  } else {
    comprobacion.textContent = "Correo electrónico incorrecto";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
    return false;
  }
}

// Comprobar nombre
function comprobarNombre() {
  const nombre = document.getElementById("nombre").value;
  const letras = /^[A-Za-zÀ-ÿ\s]+$/;

  const comprobacionNombre = document.getElementById("comprobacionNombre");

  const comprobarLetras = (variables) => letras.test(variables);

  if (comprobarLetras(nombre)) {
    comprobacionNombre.textContent = "Nombre correcto";
    comprobacionNombre.style.color = "green";
    comprobacionNombre.style.fontSize = "12px";
    return true;
  } else {
    comprobacionNombre.textContent = "Nombre incorrecto. No puede contener numeros";
    comprobacionNombre.style.color = "red";
    comprobacionNombre.style.fontSize = "12px";
    return false;
  }
}

// Comprobar apellido1
function comprobarApellido1() {
  const apellido1 = document.getElementById("apellido1").value;
  const letras = /^[A-Za-zÀ-ÿ\s]+$/;

  const comprobacionApellido1 = document.getElementById("comprobacionApellido1");

  const comprobarLetras = (variables) => letras.test(variables);

  if (comprobarLetras(apellido1)) {
    comprobacionApellido1.textContent = "Apellido correcto";
    comprobacionApellido1.style.color = "green";
    comprobacionApellido1.style.fontSize = "12px";
    return true;
  } else {
    comprobacionApellido1.textContent = "Apellido incorrecto. No puede contener numeros";
    comprobacionApellido1.style.color = "red";
    comprobacionApellido1.style.fontSize = "12px";
    return false;
  }
}

// Comprobar apellido2
function comprobarApellido2() {
  const apellido2 = document.getElementById("apellido2").value;
  const letras = /^[A-Za-zÀ-ÿ\s]+$/;

  const comprobacionApellido2 = document.getElementById("comprobacionApellido2");

  const comprobarLetras = (variables) => letras.test(variables);

  if (comprobarLetras(apellido2)) {
    comprobacionApellido2.textContent = "Apellido correcto";
    comprobacionApellido2.style.color = "green";
    comprobacionApellido2.style.fontSize = "12px";
    return true;
  } else {
    comprobacionApellido2.textContent = "Apellido incorrecto. No puede contener numeros";
    comprobacionApellido2.style.color = "red";
    comprobacionApellido2.style.fontSize = "12px";
    return false;
  }
}

// Comprobar DNI
function comprobarDNI() {
  const dni = document.getElementById("dni").value;
  const dniCom = /^\d{8}[A-Z]$/;
  const comprobacion = document.getElementById("comprobacionDNI");

  if (dniCom.test(dni)) {
    comprobacion.textContent = "DNI correcto";
    comprobacion.style.color = "green";
    comprobacion.style.fontSize = "12px";
    return true;
  } else {
    comprobacion.textContent = "DNI incorrecto";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
    return false;
  }
}

// Comprobar edad
function comprobarEdad() {
  const comprobacion = document.getElementById("comprobacionEdad");
  const fechaNacimiento = new Date(document.getElementById("nacimiento").value);
  var edad = new Date().getFullYear() - fechaNacimiento.getFullYear();

  const mes = new Date().getMonth() - fechaNacimiento.getMonth();
  const dia = new Date().getDate() - fechaNacimiento.getDate();

  if (mes < 0 || (mes === 0 && dia < 0)) {
    edad--;
  }

  if (edad >= 18) {
    comprobacion.textContent = "Eres mayor de edad";
    comprobacion.style.color = "green";
    comprobacion.style.fontSize = "12px";
    return true;
  } else {
    comprobacion.textContent = "Todavía eres MENOR de edad";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
    return false;
  }
}

// Comprobar número de teléfono
function comprobarNumero() {
  const telefono = document.getElementById("numero").value;
  const comprobacion = document.getElementById("comprobacionNumero");

  if (telefono.length === 9) {
    comprobacion.textContent = "Número correcto";
    comprobacion.style.color = "green";
    comprobacion.style.fontSize = "12px";
    return true;
  } else {
    comprobacion.textContent = "Número incorrecto";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
    return false;
  }
}

// Comprobar contraseña
function comprobarPasswd() {
  const passwd1 = document.getElementById("contraseña").value;
  const passwd2 = document.getElementById("confirmarContraseña").value;
  const comprobacion = document.getElementById("comprobacionPasswd");

  if (passwd1.length >= 8) {
    comprobacion.textContent = "Longitud correcta";
    comprobacion.style.color = "green";
    comprobacion.style.fontSize = "12px";
    if (passwd1 === passwd2) {
      comprobacion.textContent = "Las contraseñas coinciden";
      comprobacion.style.color = "green";
      comprobacion.style.fontSize = "12px";
      return true;
    } else {
      comprobacion.textContent = "Las contraseñas no coinciden";
      comprobacion.style.color = "red";
      comprobacion.style.fontSize = "12px";
      return false;
    }
  } else {
    comprobacion.textContent = "La contraseña debe tener al menos 8 caracteres";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
    return false;
  }
}

// Función para comprobar el número de tarjeta
function comprobarNumeroTarjeta() {
    const numTarjeta = document.getElementById("numeroTarjeta").value;
    const comprobacion = document.getElementById("comprobacionTarjeta");

    if (numTarjeta.length === 19) {
        comprobacion.textContent = "Número de tarjeta válido";
        comprobacion.style.color = "green";
        comprobacion.style.fontSize = "12px";
        return true;
    } else {
        comprobacion.textContent = "Número de tarjeta incorrecto. Debe tener el formato '#### #### #### ####'";
        comprobacion.style.color = "red";
        comprobacion.style.fontSize = "12px";
        return false;
    }
}

// Función para comprobar la caducidad de la tarjeta
function comprobarCaducidad() {
    const caducidad = document.getElementById("caducidadTarjeta").value;
    const comprobacion = document.getElementById("comprobacionCaducidad");

    // Verifica que la longitud sea exactamente 5 caracteres
    if (caducidad.length !== 5 || caducidad.charAt(2) !== "/") {
        comprobacion.textContent = "Formato incorrecto. Use MM/YY";
        comprobacion.style.color = "red";
        return;
    }

    // Extrae mes y año
    const mes = caducidad.substring(0, 2);
    const anio = caducidad.substring(3, 5);

    // Verifica que sean números
    if (isNaN(mes) || isNaN(anio)) {
        comprobacion.textContent = "Ingrese solo números en MM/YY";
        comprobacion.style.color = "red";
        return;
    }

    const mesNum = parseInt(mes, 10);
    const anioNum = parseInt("20" + anio, 10);
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1;

    // Verifica que el mes sea válido (1 a 12)
    if (mesNum < 1 || mesNum > 12) {
        comprobacion.textContent = "Mes inválido";
        comprobacion.style.color = "red";
        return;
    }

    // Verifica si la tarjeta está caducada
    if (anioNum > anioActual || (anioNum === anioActual && mesNum >= mesActual)) {
        comprobacion.textContent = "Caducidad válida";
        comprobacion.style.color = "green";
        return true;
    } else {
        comprobacion.textContent = "La tarjeta está caducada";
        comprobacion.style.color = "red";
        return false;
    }
}

// Función para comprobar el CVC
function comprobarCVC() {
    const cvc = document.getElementById("cvcTarjeta").value;
    const comprobacion = document.getElementById("comprobacionCVC");

    if (cvc.length === 3) {
        comprobacion.textContent = "CVC válido";
        comprobacion.style.color = "green";
        comprobacion.style.fontSize = "12px";
        return true;
    } else {
        comprobacion.textContent = "CVC inválido. Debe ser de 3 dígitos";
        comprobacion.style.color = "red";
        comprobacion.style.fontSize = "12px";
        return false;
    }
}

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