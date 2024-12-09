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

    // Método POST para registrar usuarios
    @PostMapping("/registrar")
    public String registrarUsuario(@RequestBody UsuarioDTO usuario) {
        System.out.println(usuario.getUserName());
        usuarioService.registrarUsuario(usuario);
        return "USUARIO REGISTRADO CORRECTAMENTE";
    }

    // Método GET del UsuarioController (comprobarUsuario)
    @GetMapping("/comprobarUsuario/{userName}/{userPassword}")
    public String comprobarUsuario(@PathVariable("userName") String usuario, @PathVariable("userPassword") String pwd) {

        UsuarioEntity user = usuarioService.comprobarUsuario(usuario);
        String respuesta;

        if (user == null) {
            // Si no se encuentra el usuario
            respuesta = "404 - Usuario no encontrado";
        } else {
            // Si se encuentra el usuario, validamos la contraseña
            UsuarioDTO usuarioDTO = usuarioService.validarUsuario(user, pwd);
            if (usuarioDTO == null) {
                // Si la contraseña es incorrecta
                respuesta = "Contraseña incorrecta";
            } else {
                // Si el usuario y la contraseña son correctos
                respuesta = "OK";
            }
        }

        return respuesta;
    }
}