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

    // Endpoint para registrar la jugada en SAVAGEHANDS
    @PostMapping("/registrar")
    public String registrarSavageHands(@RequestBody SavageHandDTO savageHandsDTO) {
        return savageHandService.registrarSavageHand(savageHandsDTO);
    }

    @GetMapping("/historicoId")
    public Long obtenerHistoricoId() {
        return savageHandService.obtenerUltimoHistoricoId();
    }
}