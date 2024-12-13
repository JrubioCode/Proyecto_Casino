package com.ProyectoCasino.Controller;

import com.ProyectoCasino.Model.UsuarioDTO;
import com.ProyectoCasino.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/saldo")
public class SaldoController {

    @Autowired
    private UsuarioService usuarioService;

    // Endpoint para actualizar el saldo del usuario
    @PutMapping("/actualizar")
    public UsuarioDTO actualizarSaldo(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.actualizarSaldo(usuarioDTO);
    }
}