package com.ProyectoCasino.Service;

import java.util.List;

import com.ProyectoCasino.Model.SavageHandDTO;

public interface SavageHandService {
   
    void registrarTirada(SavageHandDTO savageHandDTO);

    Integer obtenerHistoricoIdValido();

    List<SavageHandDTO> obtenerHistoricoTiradas();

}