package com.ProyectoCasino.Service.Implement;

import com.ProyectoCasino.Entity.HistoricoEntity;
import com.ProyectoCasino.Entity.JuegoEntity;
import com.ProyectoCasino.Entity.SavageHandEntity;
import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Model.SavageHandDTO;
import com.ProyectoCasino.Repository.HistoricoRepository;
import com.ProyectoCasino.Repository.JuegoRepository;
import com.ProyectoCasino.Repository.SavageHandRepository;
import com.ProyectoCasino.Repository.UsuarioRepository;
import com.ProyectoCasino.Service.SavageHandService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavageHandImplement implements SavageHandService {

    @Autowired
    private SavageHandRepository savageHandRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JuegoRepository juegoRepository;

    @Autowired
    private HistoricoRepository historicoRepository;

    @Override
    public void registrarTirada(SavageHandDTO savageHandDTO) {

        UsuarioEntity usuario = usuarioRepository.findByDni(savageHandDTO.getDni());
        if (usuario == null) {
            return;
        }

        JuegoEntity juego = juegoRepository.findById(savageHandDTO.getIdJuego()).orElse(null);
        if (juego == null) {
            return;
        }

        HistoricoEntity historico = historicoRepository.findById(savageHandDTO.getIdHistorico()).orElse(null);
        if (historico == null) {
            return;
        }

        // Crear una nueva entidad CavemanRun
        SavageHandEntity savageHandEntity = new SavageHandEntity();
        savageHandEntity.setApuesta(savageHandDTO.getApuesta());
        savageHandEntity.setFechaLogSavageHands(new Timestamp(new Date().getTime()));
        savageHandEntity.setResultado(savageHandDTO.getResultado());
        savageHandEntity.setUsuario(usuario);
        savageHandEntity.setJuego(juego);
        savageHandEntity.setHistorico(historico);

        // Guardar el nuevo registro en la tabla CAVERNSLOTS
        savageHandRepository.save(savageHandEntity);
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
        return historico.getIdHistorico();
    }

    @Override
    public List<SavageHandDTO> obtenerHistoricoTiradas() {
        List<SavageHandEntity> entities = savageHandRepository.findAll();
        List<SavageHandDTO> dtos = new ArrayList<>();
        
        for (SavageHandEntity entity : entities) {
            SavageHandDTO dto = new SavageHandDTO();
            dto.setIdLogSavageHands(entity.getIdLogSavageHands());
            dto.setApuesta(entity.getApuesta());
            dto.setResultado(entity.getResultado());
            dto.setDni(entity.getUsuario().getDni());
            dtos.add(dto);
        }
        
        return dtos;
    }
}