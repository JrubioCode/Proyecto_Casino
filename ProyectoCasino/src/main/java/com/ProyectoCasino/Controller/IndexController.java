package com.ProyectoCasino.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

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

    // Metodo para acceder al lobby
    @GetMapping("/lobby")
    public String lobby() {
        return "lobby";
    }

    // Metodo para acceder a CavemanRun
    @GetMapping("/cavemanRun")
    public String cavemanRun(){
        return "cavemanRun";
    }
}