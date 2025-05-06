package com.pruebaproteccion.prueba.service;

import com.pruebaproteccion.prueba.model.Estado;
import com.pruebaproteccion.prueba.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

    public List<Estado> listarEstados() {
        return estadoRepository.findAll();
    }
}