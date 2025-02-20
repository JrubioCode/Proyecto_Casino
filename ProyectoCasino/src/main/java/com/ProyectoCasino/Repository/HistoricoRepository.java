package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.HistoricoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoRepository extends JpaRepository<HistoricoEntity, Integer> {

    // Este método derivado lo puedes seguir usando para depuración
    HistoricoEntity findTopByOrderByIdHistoricoDesc();

    // Método con consulta personalizada para obtener el máximo idHistorico
    @Query("SELECT MAX(h.idHistorico) FROM HistoricoEntity h")
    Long obtenerUltimoHistoricoId();
}