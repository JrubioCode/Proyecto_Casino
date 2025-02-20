package com.ProyectoCasino.Service.Implement;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoCasino.Entity.CavemanRunEntity;
import com.ProyectoCasino.Entity.CavernSlotsEntity;
import com.ProyectoCasino.Entity.HistoricoEntity;
import com.ProyectoCasino.Entity.JuegoEntity;
import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.CavemanRunDTO;
import com.ProyectoCasino.Model.CavernSlotsDTO;
import com.ProyectoCasino.Repository.CavemanRunRepository;
import com.ProyectoCasino.Repository.HistoricoRepository;
import com.ProyectoCasino.Repository.JuegoRepository;
import com.ProyectoCasino.Repository.TragaperrasRepository;
import com.ProyectoCasino.Repository.UsuarioRepository;
import com.ProyectoCasino.Service.TragaperrasService;

@Service
public class TragaperrasServiceImplement implements TragaperrasService{

    @Autowired
    private TragaperrasRepository tragaperrasRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JuegoRepository juegoRepository;

    @Autowired
    private HistoricoRepository historicoRepository;

    @Override
    public void registrarTirada(CavernSlotsDTO cavernSlotsDTO) {

        UsuarioEntity usuario = usuarioRepository.findByDni(cavernSlotsDTO.getUsuarioDni());
        if (usuario == null) {
            return;
        }

        JuegoEntity juego = juegoRepository.findById(cavernSlotsDTO.getJuegoId()).orElse(null);
        if (juego == null) {
            return;
        }

        HistoricoEntity historico = historicoRepository.findById(cavernSlotsDTO.getHistoricoId()).orElse(null);
        if (historico == null) {
            return;
        }

        // Crear una nueva entidad CavemanRun
        CavernSlotsEntity cavernSlotsEntity = new CavernSlotsEntity();
        cavernSlotsEntity.setFechaLogCavernSlots(new Timestamp(new Date().getTime()));
        cavernSlotsEntity.setApuesta(cavernSlotsDTO.getApuesta());
        cavernSlotsEntity.setCombinacion(cavernSlotsDTO.getCombinacion());
        cavernSlotsEntity.setResultado(cavernSlotsDTO.getResultado());
        cavernSlotsEntity.setUsuario(usuario);
        cavernSlotsEntity.setJuego(juego);
        cavernSlotsEntity.setHistorico(historico);

        // Guardar el nuevo registro en la tabla CAVERNSLOTS
        tragaperrasRepository.save(cavernSlotsEntity);
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
    public List<CavernSlotsDTO> obtenerHistoricoTiradas() {
        // 1. Recuperamos todas las entidades de la base de datos.
        List<CavernSlotsEntity> entities = tragaperrasRepository.findAll();
        
        // 2. Convertimos cada entidad a DTO.
        List<CavernSlotsDTO> dtos = entities.stream().map(entity -> {
            CavernSlotsDTO dto = new CavernSlotsDTO();
            dto.setIdLogCavernSlots(entity.getIdLogCavernSlots());
            dto.setFechaLogCavernSlots(entity.getFechaLogCavernSlots());
            dto.setApuesta(entity.getApuesta());
            dto.setCombinacion(entity.getCombinacion());
            dto.setResultado(entity.getResultado());
            dto.setUsuarioDni(entity.getUsuario().getNombre());
            return dto;
        }).collect(Collectors.toList());
        
        // 3. Retornamos la lista de DTOs.
        return dtos;
    }
    
}