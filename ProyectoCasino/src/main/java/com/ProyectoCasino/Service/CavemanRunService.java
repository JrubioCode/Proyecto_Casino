package com.ProyectoCasino.Service;

import java.util.List;

import com.ProyectoCasino.Model.CavemanRunDTO;

public interface CavemanRunService {

    void registrarTirada(CavemanRunDTO cavemanRunDTO);

    Integer obtenerHistoricoIdValido();

    List<CavemanRunDTO> obtenerHistoricoTiradas();
    
}