package com.ProyectoCasino.Controller;

import com.ProyectoCasino.Model.CavemanRunDTO;
import com.ProyectoCasino.Service.CavemanRunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cavemanrun")
public class CavemanRunController {

    @Autowired
    private CavemanRunService cavemanRunService;

    @PostMapping("/registrar")
    public String registrarTirada(@RequestBody CavemanRunDTO cavemanRunDTO) {
        cavemanRunService.registrarTirada(cavemanRunDTO);
        return "¡Tirada registrada en CavemanRun con éxito!";
    }

    @GetMapping("/historicoId")
    public Integer obtenerHistoricoId() {
        return cavemanRunService.obtenerHistoricoIdValido();
    }
}