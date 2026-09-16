package com.mesatech.bff_service.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * v2 extiende /v1/solicitudes agregando el nombre y prioridad de la categoria
 * resuelta (en v1 solo viaja categoriaId). v1 se mantiene sin cambios para no
 * romper a los consumidores existentes; v2 es opt-in para quien necesite el
 * dato ya enriquecido sin hacer una segunda consulta al catalogo.
 */
@RestController
@RequestMapping("/v2")
public class BffV2Controller {

    private final RestTemplate restTemplate;

    @Value("${services.solicitudes.url}")
    private String solicitudesUrl;

    @Value("${services.catalogo.url}")
    private String catalogoUrl;

    public BffV2Controller(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/solicitudes")
    public ResponseEntity<Object> obtenerSolicitudesEnriquecidas() {
        List<Map<String, Object>> solicitudes =
                restTemplate.getForObject(solicitudesUrl + "/v1/solicitudes", List.class);
        List<Map<String, Object>> categorias =
                restTemplate.getForObject(catalogoUrl + "/v1/catalogo/categorias", List.class);

        Map<Object, Map<String, Object>> categoriasPorId = new HashMap<>();
        for (Map<String, Object> categoria : categorias) {
            categoriasPorId.put(categoria.get("id"), categoria);
        }

        for (Map<String, Object> solicitud : solicitudes) {
            Map<String, Object> categoria = categoriasPorId.get(solicitud.get("categoriaId"));
            solicitud.put("categoriaNombre", categoria != null ? categoria.get("nombre") : null);
            solicitud.put("categoriaPrioridad", categoria != null ? categoria.get("prioridad") : null);
        }

        return ResponseEntity.ok(solicitudes);
    }

    @GetMapping("/version")
    public ResponseEntity<Map<String, String>> version() {
        Map<String, String> info = new HashMap<>();
        info.put("servicio", "bff-service");
        info.put("version", "0.0.1-SNAPSHOT");
        return ResponseEntity.ok(info);
    }
}
