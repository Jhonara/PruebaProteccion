package com.pruebaproteccion.prueba.controller;

import com.pruebaproteccion.prueba.model.Tarea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pruebaproteccion.prueba.service.TareaService;

import java.util.List;

@RestController
@RequestMapping("/tareas")
public class TareaController {
    @Autowired
    private TareaService tareaService;

    @GetMapping
    public List<Tarea> obtenerTareas() {
        return tareaService.obtenerTodasLasTareas();
    }
}