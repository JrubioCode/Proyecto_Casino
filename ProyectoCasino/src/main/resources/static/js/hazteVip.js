const btn = document.getElementById("submit");
const form = document.getElementById("form");

btn.addEventListener("click", function (event) {
  event.preventDefault();

  // Comprobaciones
  if (comprobarNombre() && comprobarApellido1() && comprobarApellido2() && comprobarEdad() && comprobarUsuario() && comprobarEmail() && comprobarPasswd() &&
  comprobarDNI() && comprobarNumero() && comprobartitularTarjeta() && comprobarNumeroTarjeta() && comprobarCaducidad() && comprobarCVC()) {
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
        titularTarjeta: document.getElementById("titularTarjeta").value,
        numeroTarjeta: document.getElementById("numeroTarjeta").value,
        fechaExpiracion: document.getElementById("caducidadTarjeta").value,
        cvc: document.getElementById("cvcTarjeta").value
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
          } else if (response.includes("USUARIO VIP REGISTRADO CORRECTAMENTE")) {
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
            mostrarModal(response);
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

// Comprobar nombre
function comprobartitularTarjeta() {
  const nombre = document.getElementById("titularTarjeta").value;
  const letras = /^[A-Za-zÀ-ÿ\s]+$/;

  const comprobaciontitularTarjeta = document.getElementById("comprobaciontitularTarjeta");

  const comprobarLetras = (variables) => letras.test(variables);

  if (comprobarLetras(nombre)) {
    comprobaciontitularTarjeta.textContent = "Nombre correcto";
    comprobaciontitularTarjeta.style.color = "green";
    comprobaciontitularTarjeta.style.fontSize = "12px";
    return true;
  } else {
    comprobaciontitularTarjeta.textContent = "Nombre incorrecto. No puede contener numeros";
    comprobaciontitularTarjeta.style.color = "red";
    comprobaciontitularTarjeta.style.fontSize = "12px";
    return false;
  }
}

// Función que se ejecuta cada vez que el usuario escribe en el input
document.getElementById("numeroTarjeta").addEventListener("input", function() {
  const comprobacion = document.getElementById("comprobacionTarjeta");
  let rawValue = this.value;

  // 1. Comprobamos si se han introducido caracteres no numéricos (excluyendo espacios)
  if (/[^0-9\s]/.test(rawValue)) {
    comprobacion.textContent = "Solo se permiten números";
    comprobacion.style.color = "red";
    comprobacion.style.fontSize = "12px";
  } else {
    // Si no hay letras, limpiamos el mensaje de error.
    comprobacion.textContent = "";
  }

  // 2. Eliminamos todos los caracteres que no sean dígitos (quitamos también los espacios)
  let digits = rawValue.replace(/\D/g, '');

  // 3. Agrupamos los dígitos en bloques de 4
  let groups = digits.match(/.{1,4}/g);
  if (groups) {
    this.value = groups.join(' ');
  } else {
    this.value = '';
  }
});

// Función para comprobar si el número de tarjeta es válido (se puede llamar, por ejemplo, al hacer blur)
function comprobarNumeroTarjeta() {
  const numTarjeta = document.getElementById("numeroTarjeta").value;
  const comprobacion = document.getElementById("comprobacionTarjeta");

  if (numTarjeta.length === 19) { // 16 dígitos + 3 espacios
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

  // Verifica que se haya seleccionado una fecha
  if (!caducidad) {
      comprobacion.textContent = "Por favor, seleccione una fecha de caducidad";
      comprobacion.style.color = "red";
      return false;
  }

  // Para un input type="month", el formato es "YYYY-MM"
  const partes = caducidad.split("-");
  if (partes.length !== 2) {
      comprobacion.textContent = "Formato de fecha incorrecto";
      comprobacion.style.color = "red";
      return false;
  }

  const anio = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);

  // Verifica que año y mes sean números válidos
  if (isNaN(anio) || isNaN(mes)) {
      comprobacion.textContent = "La fecha contiene valores inválidos";
      comprobacion.style.color = "red";
      return false;
  }

  // Verifica que el mes esté entre 1 y 12
  if (mes < 1 || mes > 12) {
      comprobacion.textContent = "Mes inválido";
      comprobacion.style.color = "red";
      return false;
  }

  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;

  // Verifica que la fecha de caducidad no sea anterior a la fecha actual
  if (anio > anioActual || (anio === anioActual && mes >= mesActual)) {
      comprobacion.textContent = "Caducidad válida";
      comprobacion.style.color = "green";
      return true;
  } else {
      comprobacion.textContent = "La tarjeta está caducada";
      comprobacion.style.color = "red";
      return false;
  }
}

document.getElementById("cvcTarjeta").addEventListener("input", function() {
  // Reemplazamos cualquier carácter que no sea dígito por una cadena vacía
  this.value = this.value.replace(/\D/g, '');
});

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