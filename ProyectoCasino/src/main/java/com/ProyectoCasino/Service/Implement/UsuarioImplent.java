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
        return usuarioRepository.findByUserName(userName).orElse(null);
    }

    @Override
    public UsuarioDTO validarUsuario(UsuarioEntity usuarioEntity, String pwd) {
        UsuarioDTO usuario = null;

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
            usuario.setEsVip(usuarioEntity.getEsVip());
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
        usuarioEntity.setDineroUsuario(0.0);

        return usuarioRepository.save(usuarioEntity);
    }

    @Override
    public UsuarioEntity registrarUsuarioVIP(UsuarioDTO usuarioDTO) {
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
        usuarioEntity.setDineroUsuario(50.0);
        usuarioEntity.setEsVip(true);
        usuarioEntity.setTitularTarjeta(usuarioDTO.getTitularTarjeta());
        usuarioEntity.setNumeroTarjeta(usuarioDTO.getNumeroTarjeta());
        if (usuarioDTO.getFechaExpiracion() != null && !usuarioDTO.getFechaExpiracion().isEmpty()) {
            // Añadimos "-01" para transformar "YYYY-MM" en "YYYY-MM-01"
            String fechaExpCompleta = usuarioDTO.getFechaExpiracion() + "-01";
            // Convertimos el String a java.sql.Date y lo asignamos a la entidad
            usuarioEntity.setFechaExpiracion(java.sql.Date.valueOf(fechaExpCompleta));
        } else {
            usuarioEntity.setFechaExpiracion(null);
        }
        usuarioEntity.setCvc(usuarioDTO.getCvc());

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
        UsuarioEntity usuarioEntity = usuarioRepository.findById(usuarioDTO.getDni()).orElse(null);

        usuarioEntity.setDineroUsuario(usuarioDTO.getDineroUsuario());
        UsuarioEntity actualizado = usuarioRepository.save(usuarioEntity);

        usuarioDTO.setDineroUsuario(actualizado.getDineroUsuario());
        return usuarioDTO;
    }

    @Override
    public UsuarioEntity obtenerUsuarioPorDni(String dni) {
        return usuarioRepository.findById(dni).orElse(null);
    }

    @Override
    public UsuarioEntity buscarPorDni(String dni) {
        return usuarioRepository.findByDni(dni);
    }

}