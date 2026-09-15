package com.mesatech.solicitudes_service.controller;

import com.mesatech.solicitudes_service.model.Solicitud;
import com.mesatech.solicitudes_service.service.SolicitudService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/solicitudes")
public class SolicitudController {

    private final SolicitudService service;

    public SolicitudController(SolicitudService service) {
        this.service = service;
    }

    @GetMapping
    public List<Solicitud> obtenerTodas() {
        return service.obtenerTodas();
    }

    @GetMapping("/mias")
    public List<Solicitud> obtenerMias(@RequestHeader("X-User-Id") String usuarioId) {
        return service.obtenerPorUsuario(usuarioId);
    }

    @PostMapping
    public Solicitud crear(@RequestBody Solicitud solicitud) {
        return service.crear(solicitud);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Solicitud> cambiarEstado(@PathVariable Long id, @RequestParam String nuevoEstado) {
        return service.cambiarEstado(id, nuevoEstado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ExceptionHandler(SolicitudService.EstadoInvalidoException.class)
    public ResponseEntity<String> manejarEstadoInvalido(SolicitudService.EstadoInvalidoException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}
