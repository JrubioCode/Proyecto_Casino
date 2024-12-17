package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.ConversionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversionRepository extends JpaRepository<ConversionEntity, Integer> {
    ConversionEntity findFirstByJuego_IdJuegoOrderByFechaCreacionDesc(Integer idJuego);
}
