package com.mesatech.bff_service.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/v1")
public class BffController {

    private final RestTemplate restTemplate;

    @Value("${services.solicitudes.url}")
    private String solicitudesUrl;

    @Value("${services.catalogo.url}")
    private String catalogoUrl;

    public BffController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/solicitudes")
    public ResponseEntity<Object[]> obtenerSolicitudes() {
        Object[] respuesta = restTemplate.getForObject(solicitudesUrl + "/v1/solicitudes", Object[].class);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/catalogo/categorias")
    public ResponseEntity<Object[]> obtenerCategorias() {
        Object[] respuesta = restTemplate.getForObject(catalogoUrl + "/v1/catalogo/categorias", Object[].class);
        return ResponseEntity.ok(respuesta);
    }
}
