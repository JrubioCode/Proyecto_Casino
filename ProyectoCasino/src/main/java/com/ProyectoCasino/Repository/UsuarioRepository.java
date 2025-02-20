package com.ProyectoCasino.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProyectoCasino.Entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, String> {

    Optional<UsuarioEntity> findByUserName(String userName);

    Optional<UsuarioEntity> findByEmail(String email);

    UsuarioEntity findByDni(String dni);

}