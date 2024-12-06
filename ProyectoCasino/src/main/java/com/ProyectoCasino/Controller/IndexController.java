package com.ProyectoCasino.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    // Metodo para acceder al index (login)
    @GetMapping("/")
    public String index(){
        return "index";
    }
    
}
