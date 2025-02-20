package com.ProyectoCasino.Service.Implement;

import com.ProyectoCasino.Entity.SavageHandEntity;
import com.ProyectoCasino.Model.SavageHandDTO;
import com.ProyectoCasino.Repository.HistoricoRepository;
import com.ProyectoCasino.Repository.SavageHandRepository;
import com.ProyectoCasino.Service.SavageHandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavageHandImplement implements SavageHandService {

    @Autowired
    private SavageHandRepository savageHandsRepository;
    
    @Autowired
    private HistoricoRepository historicoRepository;

    @Override
    public String registrarSavageHand(SavageHandDTO savageHandsDTO) {
        // Mapear los datos del DTO a la entidad
        SavageHandEntity savageHands = new SavageHandEntity();
        savageHands.setApuesta(savageHandsDTO.getApuesta());
        savageHands.setResultado(savageHandsDTO.getResultado());
        savageHands.setDni(savageHandsDTO.getDni());
        savageHands.setIdJuego(savageHandsDTO.getIdJuego());
        savageHands.setIdHistorico(savageHandsDTO.getIdHistorico());
        
        savageHandsRepository.save(savageHands);
        System.out.println("Se guardó en SAVAGEHANDS: " + savageHands);
        return "Registro en SavageHands exitoso";
    }

    @Override
    public Long obtenerUltimoHistoricoId() {
        Long ultimoHistorico = historicoRepository.obtenerUltimoHistoricoId();
        System.out.println("Ultimo historico id obtenido en SavageHandService: " + ultimoHistorico);
        return ultimoHistorico;
    }
}