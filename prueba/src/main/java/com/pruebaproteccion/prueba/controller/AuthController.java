package com.pruebaproteccion.prueba.controller;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pruebaproteccion.prueba.service.AuthService;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String nombre = request.get("nombre");
        String password = request.get("password");

        if (authService.validarCredenciales(nombre, password)) {
            return ResponseEntity.ok(Map.of("message", "Login exitoso", "token", UUID.randomUUID().toString()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Credenciales incorrectas"));
        }
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ AuthController inicializado correctamente.");
    }
}
