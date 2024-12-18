package com.ProyectoCasino.Service.Implement;

import com.ProyectoCasino.Model.CavemanRunDTO;
import com.ProyectoCasino.Entity.CavemanRunEntity;
import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Entity.JuegoEntity;
import com.ProyectoCasino.Entity.HistoricoEntity;
import com.ProyectoCasino.Repository.CavemanRunRepository;
import com.ProyectoCasino.Repository.UsuarioRepository;
import com.ProyectoCasino.Repository.JuegoRepository;
import com.ProyectoCasino.Repository.HistoricoRepository;
import com.ProyectoCasino.Service.CavemanRunService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
@Transactional
public class CavemanRunImplement implements CavemanRunService {

    @Autowired
    private CavemanRunRepository cavemanRunRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JuegoRepository juegoRepository;

    @Autowired
    private HistoricoRepository historicoRepository;

    @Override
    public void registrarTirada(CavemanRunDTO cavemanRunDTO) {

        UsuarioEntity usuario = usuarioRepository.findByDni(cavemanRunDTO.getUsuarioDni());
        if (usuario == null) {
            return;
        }

        JuegoEntity juego = juegoRepository.findById(cavemanRunDTO.getJuegoId()).orElse(null);
        if (juego == null) {
            return;
        }

        HistoricoEntity historico = historicoRepository.findById(cavemanRunDTO.getHistoricoId()).orElse(null);
        if (historico == null) {
            return;
        }

        // Crear una nueva entidad CavemanRun
        CavemanRunEntity nuevoCavemanRun = new CavemanRunEntity();
        nuevoCavemanRun.setFechaLogCavemanRun(new Timestamp(new Date().getTime()));
        nuevoCavemanRun.setApuesta(cavemanRunDTO.getApuesta());
        nuevoCavemanRun.setMultiplicador(cavemanRunDTO.getMultiplicador());
        nuevoCavemanRun.setResultado(cavemanRunDTO.getResultado());
        nuevoCavemanRun.setUsuario(usuario);
        nuevoCavemanRun.setJuego(juego);
        nuevoCavemanRun.setHistorico(historico);

        // Guardar el nuevo registro en la tabla CAVEMANRUN
        cavemanRunRepository.save(nuevoCavemanRun);
    }
}