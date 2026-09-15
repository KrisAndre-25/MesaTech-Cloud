package com.mesatech.catalogo_service.service;

import com.mesatech.catalogo_service.model.Categoria;
import com.mesatech.catalogo_service.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> obtenerTodas() {
        return repository.findAll();
    }

    public Categoria crear(Categoria categoria) {
        return repository.save(categoria);
    }

    public Optional<Categoria> actualizar(Long id, Categoria datos) {
        return repository.findById(id).map(categoria -> {
            categoria.setNombre(datos.getNombre());
            categoria.setDescripcion(datos.getDescripcion());
            categoria.setPrioridad(datos.getPrioridad());
            return repository.save(categoria);
        });
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
