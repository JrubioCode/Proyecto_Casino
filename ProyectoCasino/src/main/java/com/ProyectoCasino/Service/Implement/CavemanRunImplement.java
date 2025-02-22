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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public Integer obtenerHistoricoIdValido() {
        HistoricoEntity historico = historicoRepository.findTopByOrderByIdHistoricoDesc();
        if (historico == null) {
            HistoricoEntity nuevoHistorico = new HistoricoEntity();
            nuevoHistorico.setFechaLogHistorico(new Timestamp(new Date().getTime()));
            historicoRepository.save(nuevoHistorico);
            return nuevoHistorico.getIdHistorico();
        }
        return historico.getIdHistorico(); // Retorna el último ID si existe
    }

     @Override
    public List<CavemanRunDTO> obtenerHistoricoTiradas() {

        List<CavemanRunEntity> entities = cavemanRunRepository.findAll();
        List<CavemanRunDTO> dtos = new ArrayList<>();
        
        for (CavemanRunEntity entity : entities) {
            CavemanRunDTO dto = new CavemanRunDTO();
            dto.setIdLogCavemanRun(entity.getIdLogCavemanRun());
            dto.setFechaLogCavemanRun(entity.getFechaLogCavemanRun());
            dto.setApuesta(entity.getApuesta());
            dto.setMultiplicador(entity.getMultiplicador());
            dto.setResultado(entity.getResultado());
            dto.setUsuarioDni(entity.getUsuario().getNombre());
            dtos.add(dto);
        }

        return dtos;
    }
}