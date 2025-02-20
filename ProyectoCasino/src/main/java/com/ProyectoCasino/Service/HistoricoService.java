package com.ProyectoCasino.Service;

import com.ProyectoCasino.Model.HistoricoDTO;

public interface HistoricoService {

    void registrarTirada(HistoricoDTO historicoDTO);

    Long obtenerUltimoHistoricoId();
    
}