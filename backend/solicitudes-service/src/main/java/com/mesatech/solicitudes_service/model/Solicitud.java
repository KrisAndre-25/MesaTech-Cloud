package com.mesatech.solicitudes_service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes")
@Data
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descripcion;
    private String estado; // CREADA, ASIGNADA, EN_PROCESO, RESUELTA, CERRADA, CANCELADA
    private Long categoriaId;
    private String usuarioId;
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
