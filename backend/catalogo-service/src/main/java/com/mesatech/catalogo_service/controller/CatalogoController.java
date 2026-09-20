package com.mesatech.catalogo_service.controller;

import com.mesatech.catalogo_service.model.Categoria;
import com.mesatech.catalogo_service.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/catalogo")
public class CatalogoController {

    private final CategoriaService service;

    public CatalogoController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping("/categorias")
    public List<Categoria> obtenerCategorias() {
        return service.obtenerTodas();
    }

    @PostMapping("/categorias")
    public Categoria crearCategoria(@RequestBody Categoria categoria) {
        return service.crear(categoria);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        return service.actualizar(id, categoria)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        return service.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
