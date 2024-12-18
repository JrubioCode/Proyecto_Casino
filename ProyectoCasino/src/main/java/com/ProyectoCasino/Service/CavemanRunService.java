package com.ProyectoCasino.Service;

import com.ProyectoCasino.Model.CavemanRunDTO;

public interface CavemanRunService {

    void registrarTirada(CavemanRunDTO cavemanRunDTO);

    Integer obtenerHistoricoIdValido();
    
}
