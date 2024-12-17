package com.ProyectoCasino.Controller;

import com.ProyectoCasino.Service.ConversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/conversion")
public class ConversionController {

    @Autowired
    private ConversionService conversionService;

    // Endpoint para obtener el multiplicador
    @GetMapping("/obtenerMultiplicador/{idJuego}")
    public String obtenerMultiplicador(@PathVariable Integer idJuego) {
        Double multiplicador = conversionService.obtenerMultiplicadorPorJuego(idJuego);
        return multiplicador != null ? multiplicador.toString() : "0.0";
    }
}