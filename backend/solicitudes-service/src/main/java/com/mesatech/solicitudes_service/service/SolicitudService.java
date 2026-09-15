package com.mesatech.solicitudes_service.service;

import com.mesatech.solicitudes_service.model.Solicitud;
import com.mesatech.solicitudes_service.repository.SolicitudRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class SolicitudService {

    private static final Map<String, Set<String>> TRANSICIONES_VALIDAS = Map.of(
            "CREADA", Set.of("ASIGNADA", "CANCELADA"),
            "ASIGNADA", Set.of("EN_PROCESO", "CANCELADA"),
            "EN_PROCESO", Set.of("RESUELTA", "CANCELADA"),
            "RESUELTA", Set.of("CERRADA"),
            "CERRADA", Set.of(),
            "CANCELADA", Set.of()
    );

    private final SolicitudRepository repository;

    public SolicitudService(SolicitudRepository repository) {
        this.repository = repository;
    }

    public List<Solicitud> obtenerTodas() {
        return repository.findAll();
    }

    public List<Solicitud> obtenerPorUsuario(String usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public Solicitud crear(Solicitud solicitud) {
        solicitud.setEstado("CREADA");
        return repository.save(solicitud);
    }

    public Optional<Solicitud> cambiarEstado(Long id, String nuevoEstado) {
        return repository.findById(id).map(solicitud -> {
            validarTransicion(solicitud.getEstado(), nuevoEstado);
            solicitud.setEstado(nuevoEstado);
            return repository.save(solicitud);
        });
    }

    private void validarTransicion(String estadoActual, String nuevoEstado) {
        Set<String> permitidos = TRANSICIONES_VALIDAS.get(estadoActual);
        if (permitidos == null || !permitidos.contains(nuevoEstado)) {
            throw new EstadoInvalidoException(
                    "No se puede pasar de " + estadoActual + " a " + nuevoEstado);
        }
    }

    public static class EstadoInvalidoException extends RuntimeException {
        public EstadoInvalidoException(String mensaje) {
            super(mensaje);
        }
    }
}
