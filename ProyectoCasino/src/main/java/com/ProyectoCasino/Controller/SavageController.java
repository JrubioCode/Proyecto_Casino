package com.ProyectoCasino.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ProyectoCasino.Model.SavageHandDTO;
import com.ProyectoCasino.Service.SavageHandService;

@RestController
@RequestMapping("/savagehands")
public class SavageController {

    @Autowired
    private SavageHandService savageHandService;

    @PostMapping("/registrar")
    public String registrarSavageHands(@RequestBody SavageHandDTO savageHandsDTO) {
        savageHandService.registrarTirada(savageHandsDTO);
        return "¡Tirada registrada en CavemanRun con éxito!";
    }

    @GetMapping("/historicoId")
    public Integer obtenerHistoricoId() {
        return savageHandService.obtenerHistoricoIdValido();
    }
}