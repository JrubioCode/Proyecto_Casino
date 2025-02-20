package com.ProyectoCasino.Service;

import com.ProyectoCasino.Model.SavageHandDTO;

public interface SavageHandService {
    String registrarSavageHand(SavageHandDTO savageHandsDTO);
    
    Long obtenerUltimoHistoricoId();
}