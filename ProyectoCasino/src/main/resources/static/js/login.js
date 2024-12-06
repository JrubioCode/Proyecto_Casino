function comprobaciones(event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();
    if (comprobarUsuario() && comprobarPasswd()) {
        window.location.href = "/registro.html";
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
        setTimeout(() =>{
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
        setTimeout(() =>{
            comprobacion.textContent = "";
        }, 3000);
        return false;
    }
}