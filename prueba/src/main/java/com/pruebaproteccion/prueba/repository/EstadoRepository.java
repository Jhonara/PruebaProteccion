package com.pruebaproteccion.prueba.repository;

import com.pruebaproteccion.prueba.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {}



