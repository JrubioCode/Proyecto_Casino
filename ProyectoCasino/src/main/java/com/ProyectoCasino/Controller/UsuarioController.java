package com.ProyectoCasino.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.UsuarioDTO;
import com.ProyectoCasino.Service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public String registrarUsuario(@RequestBody UsuarioDTO usuario) {
  
        if (usuarioService.usuarioExiste(usuario.getDni())) {
            return "Error: El DNI ya está registrado.";
        }
        if (usuarioService.userNameExiste(usuario.getUserName())) {
            return "Error: El nombre de usuario ya está en uso.";
        }
        if (usuarioService.emailExiste(usuario.getEmail())) {
            return "Error: El correo electrónico ya está registrado.";
        }

        usuarioService.registrarUsuario(usuario);
        return "USUARIO REGISTRADO CORRECTAMENTE";
    }

    @GetMapping("/comprobarUsuario/{userName}/{userPassword}")
    public String comprobarUsuario(@PathVariable("userName") String userName, @PathVariable("userPassword") String pwd) {
        UsuarioEntity user = usuarioService.comprobarUsuario(userName);
        String respuesta;

        if (user == null) {
            respuesta = "404 - Usuario no encontrado";
        } else {
            // Comparamos contraseña de forma estricta
            UsuarioDTO usuarioDTO = usuarioService.validarUsuario(user, pwd);
            if (usuarioDTO == null) {
                respuesta = "Contraseña incorrecta";
            } else {
                respuesta = "OK";
            }
        }
        return respuesta;
    }
}