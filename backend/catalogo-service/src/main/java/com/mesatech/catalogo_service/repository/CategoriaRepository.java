package com.mesatech.catalogo_service.repository;

import com.mesatech.catalogo_service.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
