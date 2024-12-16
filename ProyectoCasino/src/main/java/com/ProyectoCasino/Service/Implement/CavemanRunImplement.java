package com.ProyectoCasino.Service.Implement;

import com.ProyectoCasino.Entity.CavemanRunEntity;
import com.ProyectoCasino.Repository.CavemanRunRepository;
import com.ProyectoCasino.Service.CavemanRunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CavemanRunImplement implements CavemanRunService {

    @Autowired
    private CavemanRunRepository cavemanRunRepository;

    @Override
    public CavemanRunEntity registrarTirada(CavemanRunEntity cavemanRun) {
        return cavemanRunRepository.save(cavemanRun);
    }
}
