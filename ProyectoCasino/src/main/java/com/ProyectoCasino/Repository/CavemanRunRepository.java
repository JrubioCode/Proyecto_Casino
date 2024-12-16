package com.ProyectoCasino.Repository;

import com.ProyectoCasino.Entity.CavemanRunEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CavemanRunRepository extends JpaRepository<CavemanRunEntity, Integer> {

    
}
