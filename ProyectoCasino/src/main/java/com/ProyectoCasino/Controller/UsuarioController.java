package com.ProyectoCasino.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.UsuarioDTO;
import com.ProyectoCasino.Service.UsuarioService;

@Controller
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Método POST para registrar usuarios
    @PostMapping("/registrar")
    public String registrarUsuario(@RequestBody UsuarioDTO usuario) {
        usuarioService.registrarUsuario(usuario);
        return "USUARIO REGISTRADO CORRECTAMENTE";
    }

    // Método GET para comprobar usuarios por DNI
    @GetMapping("/comprobarUsuario/{dni}/{pwd}")
    public String comprobarUsuario(@PathVariable("dni") String dni, @PathVariable("pwd") String pwd) {
        UsuarioEntity user = usuarioService.comprobarUsuario(dni);
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        String respuesta;

        if (user == null) {
            respuesta = "404 - Usuario no encontrado";
        } else {
            usuarioDTO = usuarioService.validarUsuario(user, pwd);
            if (usuarioDTO == null) {
                respuesta = "Contraseña incorrecta";
            } else {
                respuesta = "OK";
            }
        }
        return respuesta;
    }
}