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

    // Método GET del UsuarioController (comprobarUsuario)
    public UsuarioEntity comprobarUsuario(String dni) {
        Optional<UsuarioEntity> userEntity = usuarioRepository.findById(dni);
        return userEntity.orElse(null);
    }

    // Método GET del UsuarioController (validarUsuario)
    public UsuarioDTO validarUsuario(UsuarioEntity usuarioEntity, String pwd) {
        UsuarioDTO usuario = null;
        if (usuarioEntity.getUserPassword().equals(pwd)) {
            usuario = new UsuarioDTO();
            usuario.setDni(usuarioEntity.getDni());
            usuario.setUserName(usuarioEntity.getUserName());
            usuario.setUserPassword(usuarioEntity.getUserPassword());
            usuario.setNombre(usuarioEntity.getNombre());
            usuario.setApellido1(usuarioEntity.getApellido1());
            usuario.setApellido2(usuarioEntity.getApellido2());
            usuario.setFechaNacimiento(usuarioEntity.getFechaNacimiento().toString());
            usuario.setEmail(usuarioEntity.getEmail());
            usuario.setNumeroTelefono(usuarioEntity.getNumeroTelefono());
        }
        return usuario;
    }

    // Método POST del UsuarioController (registrarUsuario)
    public UsuarioEntity registrarUsuario(UsuarioDTO usuarioDTO) {
        UsuarioEntity usuarioEntity = new UsuarioEntity();
        usuarioEntity.setDni(usuarioDTO.getDni());
        usuarioEntity.setNombre(usuarioDTO.getNombre());
        usuarioEntity.setApellido1(usuarioDTO.getApellido1());
        usuarioEntity.setApellido2(usuarioDTO.getApellido2());
        usuarioEntity.setFechaNacimiento(java.sql.Date.valueOf(usuarioDTO.getFechaNacimiento()));
        usuarioEntity.setUserName(usuarioDTO.getUserName());
        usuarioEntity.setEmail(usuarioDTO.getEmail());
        usuarioEntity.setUserPassword(usuarioDTO.getUserPassword());
        usuarioEntity.setNumeroTelefono(usuarioDTO.getNumeroTelefono());

        return usuarioRepository.save(usuarioEntity);
    }
}
