package com.pruebaproteccion.prueba.controller;

import com.pruebaproteccion.prueba.model.Estado;
import com.pruebaproteccion.prueba.service.EstadoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController  // 🔥 Hacemos que devuelva JSON para el frontend
@RequestMapping("/estados")
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @GetMapping
    public List<Estado> listarEstados() { // 🔥 Ahora React puede obtener los estados
        return estadoService.listarEstados();
    }
}