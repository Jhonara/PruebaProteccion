package com.pruebaproteccion.prueba.repository;

import com.pruebaproteccion.prueba.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {}
