package com.ProyectoCasino.Service.Implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.UsuarioDTO;
import com.ProyectoCasino.Repository.UsuarioRepository;
import com.ProyectoCasino.Service.UsuarioService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioImplent implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioEntity comprobarUsuario(String usuario) {
        Optional<UsuarioEntity> userEntity = usuarioRepository.findById(usuario);
        return userEntity.orElse(null);
    }

    public UsuarioDTO validarUsuario(UsuarioEntity usuarioEntity, String pwd) {
        UsuarioDTO usuario = null;
        if (usuarioEntity.getUser_password().equals(pwd)) {
            usuario = new UsuarioDTO();
            usuario.setUser_name(usuarioEntity.getUser_name());
            usuario.setUser_password(usuarioEntity.getUser_password());
        }
        return usuario;
    }
}