package com.ProyectoCasino.Controller;

import com.ProyectoCasino.Model.HistoricoDTO;
import com.ProyectoCasino.Service.HistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/historico")
public class HistoricoController {

    @Autowired
    private HistoricoService historicoService;

    // Endpoint para registrar un histórico
    @PostMapping("/registrar")
    public String registrarTirada(@RequestBody HistoricoDTO historicoDTO) {
        historicoService.registrarTirada(historicoDTO);
        return "¡Tirada registrada con éxito!";
    }
}
