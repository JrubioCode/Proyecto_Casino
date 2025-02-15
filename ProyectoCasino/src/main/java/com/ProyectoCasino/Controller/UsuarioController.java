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

    // Registro normal
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

    // Registro vip
    @PostMapping("/registrarVIP")
    public String registrarUsuarioVIP(@RequestBody UsuarioDTO usuario) {
  
        if (usuarioService.usuarioExiste(usuario.getDni())) {
            return "Error: El DNI ya está registrado.";
        }
        if (usuarioService.userNameExiste(usuario.getUserName())) {
            return "Error: El nombre de usuario ya está en uso.";
        }
        if (usuarioService.emailExiste(usuario.getEmail())) {
            return "Error: El correo electrónico ya está registrado.";
        }

        usuarioService.registrarUsuarioVIP(usuario);
        return "USUARIO VIP REGISTRADO CORRECTAMENTE";
    }

    // Login
    @GetMapping("/autenticar/{userName}/{userPassword}")
    public Object autenticarUsuario(@PathVariable("userName") String userName,  @PathVariable("userPassword") String userPassword) {
        UsuarioEntity usuarioEntity = usuarioService.comprobarUsuario(userName);
        
        if (usuarioEntity == null) {
            return "404 - Usuario no encontrado";
        }
        
        UsuarioDTO usuarioDTO = usuarioService.validarUsuario(usuarioEntity, userPassword);
        if (usuarioDTO == null) {
            return "Contraseña incorrecta";
        }

        return usuarioDTO;
    }


    @GetMapping("/obtenerSaldo/{dni}")
    public double obtenerSaldo(@PathVariable("dni") String dni) {
    UsuarioEntity usuarioEntity = usuarioService.obtenerUsuarioPorDni(dni);
    return usuarioEntity != null ? usuarioEntity.getDineroUsuario() : 0.0;
    }

    @PostMapping("/actualizar")
    public UsuarioDTO actualizarSaldo(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.actualizarSaldo(usuarioDTO);
    }

}