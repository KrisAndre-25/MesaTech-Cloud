package com.mesatech.bff_service.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

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
        if (categoriaEnUso(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "No se puede eliminar: hay solicitudes que usan esta categoría."));
        }
        return reenviar(HttpMethod.DELETE, catalogoUrl + "/v1/catalogo/categorias/" + id, null, null);
    }

    // Antes de borrar una categoria se verifica que ninguna solicitud la este usando,
    // ya que solicitudes-service no aplica una FK real sobre categoriaId (son servicios
    // desacoplados) y un borrado dejaria referencias huerfanas sin aviso.
    @SuppressWarnings("unchecked")
    private boolean categoriaEnUso(Long categoriaId) {
        List<Map<String, Object>> solicitudes =
                restTemplate.getForObject(solicitudesUrl + "/v1/solicitudes", List.class);
        if (solicitudes == null) {
            return false;
        }
        return solicitudes.stream().anyMatch(s -> {
            Object valor = s.get("categoriaId");
            return valor != null && categoriaId.equals(Long.valueOf(valor.toString()));
        });
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
