package com.mesatech.solicitudes_service.controller;

import com.mesatech.solicitudes_service.model.Solicitud;
import com.mesatech.solicitudes_service.repository.SolicitudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/solicitudes")
public class SolicitudController {

    private final SolicitudRepository repository;

    public SolicitudController(SolicitudRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Solicitud> obtenerTodas() {
        return repository.findAll();
    }

    @PostMapping
    public Solicitud crear(@RequestBody Solicitud solicitud) {
        solicitud.setEstado("CREADA");
        return repository.save(solicitud);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Solicitud> cambiarEstado(@PathVariable Long id, @RequestParam String nuevoEstado) {
        return repository.findById(id).map(s -> {
            s.setEstado(nuevoEstado);
            return ResponseEntity.ok(repository.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }
}
