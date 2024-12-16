package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.HistoricoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoRepository extends JpaRepository<HistoricoEntity, Integer> {
    // Métodos adicionales si es necesario
}
