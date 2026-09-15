package com.mesatech.bff_service.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
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

    // ---- Solicitudes ----

    @GetMapping("/solicitudes")
    public ResponseEntity<Object> obtenerSolicitudes() {
        return reenviar(HttpMethod.GET, solicitudesUrl + "/v1/solicitudes", null, null);
    }

    @GetMapping("/solicitudes/mias")
    public ResponseEntity<Object> obtenerMisSolicitudes(@AuthenticationPrincipal Jwt jwt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-User-Id", jwt.getClaimAsString("oid"));
        return reenviar(HttpMethod.GET, solicitudesUrl + "/v1/solicitudes/mias", null, headers);
    }

    @PostMapping("/solicitudes")
    public ResponseEntity<Object> crearSolicitud(@RequestBody Object solicitud) {
        return reenviar(HttpMethod.POST, solicitudesUrl + "/v1/solicitudes", solicitud, null);
    }

    @PutMapping("/solicitudes/{id}/estado")
    public ResponseEntity<Object> cambiarEstado(@PathVariable Long id, @RequestParam String nuevoEstado) {
        String url = solicitudesUrl + "/v1/solicitudes/" + id + "/estado?nuevoEstado=" + nuevoEstado;
        return reenviar(HttpMethod.PUT, url, null, null);
    }

    // ---- Catalogo ----

    @GetMapping("/catalogo/categorias")
    public ResponseEntity<Object> obtenerCategorias() {
        return reenviar(HttpMethod.GET, catalogoUrl + "/v1/catalogo/categorias", null, null);
    }

    @PostMapping("/catalogo/categorias")
    public ResponseEntity<Object> crearCategoria(@RequestBody Object categoria) {
        return reenviar(HttpMethod.POST, catalogoUrl + "/v1/catalogo/categorias", categoria, null);
    }

    @PutMapping("/catalogo/categorias/{id}")
    public ResponseEntity<Object> actualizarCategoria(@PathVariable Long id, @RequestBody Object categoria) {
        return reenviar(HttpMethod.PUT, catalogoUrl + "/v1/catalogo/categorias/" + id, categoria, null);
    }

    @DeleteMapping("/catalogo/categorias/{id}")
    public ResponseEntity<Object> eliminarCategoria(@PathVariable Long id) {
        return reenviar(HttpMethod.DELETE, catalogoUrl + "/v1/catalogo/categorias/" + id, null, null);
    }

    // Reenvía la petición al microservicio correspondiente y propaga su código de respuesta.
    private ResponseEntity<Object> reenviar(HttpMethod metodo, String url, Object cuerpo, HttpHeaders headers) {
        HttpEntity<Object> entidad = new HttpEntity<>(cuerpo, headers);
        try {
            return restTemplate.exchange(url, metodo, entidad, Object.class);
        } catch (HttpStatusCodeException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(ex.getResponseBodyAsString());
        }
    }
}
