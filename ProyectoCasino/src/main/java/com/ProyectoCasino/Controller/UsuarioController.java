package com.ProyectoCasino.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.UsuarioDTO;
import com.ProyectoCasino.Service.UsuarioService;


@Controller
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Metodo post del registro para guardar usuarios
    

    // Metodo get del login para comprobar usuarios
    @GetMapping("/comprobarUsuario/{usuario}/{pwd}")
    public String comprobarUsuario(@PathVariable("usuario") String usuario, @PathVariable("pwd") String pwd) {
        UsuarioEntity user = usuarioService.comprobarUsuario(usuario);
        UsuarioDTO usuarioDTO = new UsuarioDTO();
		String respuesta;
		if(user==null) {
			respuesta = "404";
		}else {
			 usuarioDTO = usuarioService.validarUsuario(usuario, pwd);
			 if(usuarioDTO == null) {
				 respuesta = "Contraseña incorrecta";
			 }else {
				 respuesta = "OK";
			 }
		}
		return respuesta;
    }
    
}