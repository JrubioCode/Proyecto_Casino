package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.HistoricoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoRepository extends JpaRepository<HistoricoEntity, Integer> {
    HistoricoEntity findTopByOrderByIdHistoricoDesc(); // Obtiene el último registro por ID
}
