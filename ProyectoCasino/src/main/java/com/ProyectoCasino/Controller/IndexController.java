package com.ProyectoCasino.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.CavemanRunDTO;
import com.ProyectoCasino.Service.CavemanRunService;
import com.ProyectoCasino.Service.UsuarioService;

@Controller
public class IndexController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    CavemanRunService cavemanRunService;

    // Metodo para acceder al login
    @GetMapping("/")
    public String index() {
        return "index";
    }

    // Metodo para acceder al registro
    @GetMapping("/registro")
    public String registro() {
        return "registro";
    }

    @GetMapping("/lobby")
    public String lobby(@RequestParam("dni") String dni, Model model) {
        UsuarioEntity usuario = usuarioService.buscarPorDni(dni);
        // Pasarle a la vista el atributo esVip
        if (usuario != null) {
            model.addAttribute("esVip", usuario.getEsVip());
        } else {
            model.addAttribute("esVip", false);
        }

        return "lobby";
    }

    // Metodo para acceder a CavemanRun
    @GetMapping("/prehistoricSlot")
    public String prehistoricSlot() {
        return "tragaperras";
    }

    // Metodo para acceder a CavemanRun
    @GetMapping("/cavemanRun")
    public String cavemanRun(Model model) {
        List<CavemanRunDTO> historialTiradas = cavemanRunService.obtenerHistoricoTiradas();
        model.addAttribute("historialTiradas", historialTiradas);
        return "cavemanRun";
    }

    // Metodo para acceder a BlackJack
    @GetMapping("/blackjack")
    public String blackjack() {
        return "savageHands";
    }

    // Metodo para acceder a hazte vip
    @GetMapping("/hazteVip")
    public String hazteVip() {
        return "hazteVip";
    }
}