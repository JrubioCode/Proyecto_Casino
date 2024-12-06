function comprobaciones(event) {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();
    if (comprobarUsuario() && comprobarPasswd()) {

        // Realizar una solicitud AJAX GET al UsuarioController usando jQuery
        var usuario = $("#usuario").val();
        var pwd = $("#contraseña").val();
       
       $.ajax({
           type: "GET",
           url: `/usuario/comprobarUsuario/${usuario}/${pwd}`, //CONFIGURAR LA URL PARA QUE DIRIJA AL CONTROLADOR
           success: function(response) {
               //POSIBLES SALIDAS DEL RESPONSE 
               if(response == "200"){
                   console.log("Respuesta del servidor (GET):", "Redirigiendo al lobby");
                   window.location.pathname = "/lobby";
               }else if(response == "300"){
                   window.alert("Usuario no encontrado.");
               }else if(response == "400"){
                   window.alert("Contraseña incorrecta.")
               }
           },
           error: function(error) {
               console.error("Error en la solicitud AJAX (GET):", error);
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