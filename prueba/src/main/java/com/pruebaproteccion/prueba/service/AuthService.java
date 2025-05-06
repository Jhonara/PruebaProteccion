package com.pruebaproteccion.prueba.service;

import com.pruebaproteccion.prueba.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pruebaproteccion.prueba.repository.UsuarioRepository;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean validarCredenciales(String nombre, String password) {
        Usuario usuario = usuarioRepository.findByNombre(nombre.trim());

        System.out.println("Nombre recibido: " + nombre);
        System.out.println("Password recibido: " + password);
        System.out.println("Password en BD: " + (usuario != null ? usuario.getPassword() : "Usuario no encontrado"));
        if (usuario != null) {
            return usuario.getPassword().equals(password.trim());
        }
        return false;
    }
}
