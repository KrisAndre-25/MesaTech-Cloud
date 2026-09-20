package com.mesatech.solicitudes_service.repository;

import com.mesatech.solicitudes_service.model.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    List<Solicitud> findByUsuarioId(String usuarioId);
}
