package com.ProyectoCasino.Service.Implement;

import com.ProyectoCasino.Model.HistoricoDTO;
import com.ProyectoCasino.Entity.HistoricoEntity;
import com.ProyectoCasino.Entity.UsuarioEntity;
import com.ProyectoCasino.Entity.JuegoEntity;
import com.ProyectoCasino.Repository.HistoricoRepository;
import com.ProyectoCasino.Repository.UsuarioRepository;
import com.ProyectoCasino.Repository.JuegoRepository;
import com.ProyectoCasino.Service.HistoricoService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Transactional
public class HistoricoImplement implements HistoricoService {

    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;  // Para obtener el UsuarioEntity

    @Autowired
    private JuegoRepository juegoRepository;  // Para obtener el JuegoEntity

    public void registrarTirada(HistoricoDTO historicoDTO) {
        // Obtener el UsuarioEntity a partir del DNI
        UsuarioEntity usuario = usuarioRepository.findByDni(historicoDTO.getUsuarioDni());
        if (usuario == null) {
            // Log para indicar que no se encontró el usuario
            System.out.println("Usuario no encontrado con DNI: " + historicoDTO.getUsuarioDni());
            return;
        }
    
        // Obtener el JuegoEntity a partir del ID del juego
        JuegoEntity juego = juegoRepository.findById(historicoDTO.getJuegoId()).orElse(null);
        if (juego == null) {

            System.out.println("Juego no encontrado con ID: " + historicoDTO.getJuegoId());
            return;
        }
    
        // Crear una nueva entidad Historico
        HistoricoEntity nuevoHistorico = new HistoricoEntity();
        nuevoHistorico.setFechaLogHistorico(historicoDTO.getFechaLogHistorico() != null ? historicoDTO.getFechaLogHistorico() : new Date());
        nuevoHistorico.setUsuario(usuario);
        nuevoHistorico.setJuego(juego);
    
        historicoRepository.save(nuevoHistorico);
    }

}
