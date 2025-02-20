package com.ProyectoCasino.Service;

import java.util.List;

import com.ProyectoCasino.Model.CavernSlotsDTO;

public interface TragaperrasService {

    void registrarTirada(CavernSlotsDTO cavernSlotsDTO);

    Integer obtenerHistoricoIdValido();

    List<CavernSlotsDTO> obtenerHistoricoTiradas();
    
} 