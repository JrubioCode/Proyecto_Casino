package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.CavemanRunEntity;
import com.ProyectoCasino.Entity.HistoricoEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CavemanRunRepository extends JpaRepository<CavemanRunEntity, Integer> {

    
}
