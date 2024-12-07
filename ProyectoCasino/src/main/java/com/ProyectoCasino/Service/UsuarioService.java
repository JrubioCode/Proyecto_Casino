package com.ProyectoCasino.Service;

import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.UsuarioDTO;

public interface UsuarioService {

    UsuarioEntity comprobarUsuario(String usuario);

    UsuarioDTO validarUsuario(UsuarioEntity usuarioEntity, String pwd);

    UsuarioEntity registrarUsuario(UsuarioDTO usuarioDTO);

}