package com.ProyectoCasino.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoCasino.Model.CavernSlotsDTO;
import com.ProyectoCasino.Service.TragaperrasService;

@RestController
@RequestMapping("/prehistoricSlot")
public class TragaperrasController {

    @Autowired
    private TragaperrasService tragaperrasService;

    @PostMapping("/registrar")
    public String registrarTirada(@RequestBody CavernSlotsDTO cavernSlotsDTO) {
        tragaperrasService.registrarTirada(cavernSlotsDTO);
        return "¡Tirada registrada en CavemanRun con éxito!";
    }

    @GetMapping("/historicoId")
    public Integer obtenerHistoricoId() {
        return tragaperrasService.obtenerHistoricoIdValido();
    }
    
}