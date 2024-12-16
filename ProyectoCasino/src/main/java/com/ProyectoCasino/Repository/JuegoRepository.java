package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.JuegoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JuegoRepository extends JpaRepository<JuegoEntity, Integer> {
    // Métodos adicionales si es necesario
}
