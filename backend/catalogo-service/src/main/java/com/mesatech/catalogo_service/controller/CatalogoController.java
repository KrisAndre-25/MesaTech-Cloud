package com.mesatech.catalogo_service.controller;

import com.mesatech.catalogo_service.model.Categoria;
import com.mesatech.catalogo_service.repository.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/catalogo")
public class CatalogoController {

    private final CategoriaRepository repository;

    public CatalogoController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/categorias")
    public List<Categoria> obtenerCategorias() {
        return repository.findAll();
    }

    @PostMapping("/categorias")
    public Categoria crearCategoria(@RequestBody Categoria categoria) {
        return repository.save(categoria);
    }
}
