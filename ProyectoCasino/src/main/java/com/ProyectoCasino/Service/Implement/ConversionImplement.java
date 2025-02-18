package com.ProyectoCasino.Service.Implement;

import com.ProyectoCasino.Entity.ConversionEntity;
import com.ProyectoCasino.Repository.ConversionRepository;
import com.ProyectoCasino.Service.ConversionService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ConversionImplement implements ConversionService {

    @Autowired
    private ConversionRepository conversionRepository;

    public Double obtenerMultiplicadorPorJuego(Integer idJuego) {
        ConversionEntity conversion = conversionRepository.findFirstByJuego_IdJuegoOrderByFechaCreacionDesc(idJuego);
        return conversion != null ? conversion.getMultiplicador() : null;
    }
}