package com.ProyectoCasino.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProyectoCasino.Entity.SavageHandEntity;

@Repository
public interface SavageHandRepository extends JpaRepository<SavageHandEntity, Integer> {

}