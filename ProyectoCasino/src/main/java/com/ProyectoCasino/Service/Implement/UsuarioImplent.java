package com.ProyectoCasino.Service.Implement;

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

    @Override
    public UsuarioEntity comprobarUsuario(String userName) {
        // Hacemos la búsqueda sensible a mayúsculas/minúsculas
        return usuarioRepository.findByUserName(userName).orElse(null);
    }

    @Override
    public UsuarioDTO validarUsuario(UsuarioEntity usuarioEntity, String pwd) {
        UsuarioDTO usuario = null;

        // Comparación estricta de contraseña
        if (usuarioEntity != null && usuarioEntity.getUserPassword().equals(pwd)) {
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

    @Override
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

    @Override
    public boolean usuarioExiste(String dni) {
        return usuarioRepository.existsById(dni);
    }

    @Override
    public boolean userNameExiste(String userName) {
        return usuarioRepository.findByUserName(userName).isPresent();
    }

    @Override
    public boolean emailExiste(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

    @Override
    public UsuarioDTO actualizarSaldo(UsuarioDTO usuarioDTO) {
        UsuarioEntity usuarioEntity = usuarioRepository.findById(usuarioDTO.getDni())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar saldo en la entidad
        usuarioEntity.setDineroUsuario(usuarioDTO.getDineroUsuario());
        UsuarioEntity actualizado = usuarioRepository.save(usuarioEntity);

        // Mapear de vuelta a DTO
        usuarioDTO.setDineroUsuario(actualizado.getDineroUsuario());
        return usuarioDTO;
    }
}