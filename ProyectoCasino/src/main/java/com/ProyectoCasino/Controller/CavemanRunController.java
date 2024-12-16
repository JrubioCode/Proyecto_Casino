package com.ProyectoCasino.Controller;

import com.ProyectoCasino.Entity.CavemanRunEntity;
import com.ProyectoCasino.Entity.HistoricoEntity;
import com.ProyectoCasino.Entity.JuegoEntity;
import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Service.CavemanRunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/cavemanrun")
public class CavemanRunController {

    @Autowired
    private CavemanRunService cavemanRunService;

    @PostMapping("/registrar")
public CavemanRunEntity registrarTirada(
        @RequestParam Integer apuesta,
        @RequestParam Double multiplicador,
        @RequestParam Double resultado,
        @RequestParam String idUsuario,
        @RequestParam Integer idJuego) {

    // Crear una nueva tirada de Caveman Run
    CavemanRunEntity cavemanRun = new CavemanRunEntity();
    cavemanRun.setApuesta(apuesta);
    cavemanRun.setMultiplicador(multiplicador);
    cavemanRun.setResultado(resultado);
    cavemanRun.setFechaLogCavemanRun(new Date());

    // Aquí ya no necesitas pasar el 'idHistorico'
    // Si 'idHistorico' es autoincremental, no lo agregues
    HistoricoEntity historico = new HistoricoEntity();  // El 'idHistorico' será asignado por la base de datos
    cavemanRun.setHistorico(historico);  // La base de datos se encarga de autogenerar el 'idHistorico'

    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setDni(idUsuario);
    cavemanRun.setUsuario(usuario);

    JuegoEntity juego = new JuegoEntity();
    juego.setIdJuego(idJuego);
    cavemanRun.setJuego(juego);

    // Registrar la tirada
    return cavemanRunService.registrarTirada(cavemanRun);
}

}