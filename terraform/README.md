# Despliegue AWS (Terraform) — MesaTech Cloud

Infraestructura: 1 EC2 (Docker + Postgres + los 3 `.jar` como servicios
systemd) + API Gateway HTTP API con JWT Authorizer validando tokens de
Microsoft Entra ID.

## Requisitos previos

1. **Credenciales de AWS Academy vigentes** en `~/.aws/credentials`
   (Start Lab → AWS Details → copiar Access Key/Secret/Session Token).
   Verificar con `aws sts get-caller-identity`.
2. **Compilar los 3 microservicios** (Terraform copia los `.jar`, no los compila):
   ```bash
   cd backend/bff-service && ./gradlew bootJar
   cd ../solicitudes-service && ./gradlew bootJar
   cd ../catalogo-service && ./gradlew bootJar
   ```

## Despliegue

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

`terraform apply` crea el key pair, la EC2 (con Docker + Postgres vía
`user_data`), copia los 3 `.jar` por SSH y los deja corriendo como
servicios systemd (`bff-service`, `solicitudes-service`,
`catalogo-service`), y crea el API Gateway HTTP API.

Al terminar, `terraform output` entrega:
- `ec2_public_ip`
- `ssh_command` (usa la clave `mesatech-key.pem` generada en este directorio)
- `api_gateway_invoke_url` — usar como `REACT_APP_API_URL` en el frontend
- `bff_direct_url` — acceso directo al BFF, sin pasar por API Gateway (debug)

## Redesplegar tras un cambio de código

Volver a compilar el `.jar` correspondiente y ejecutar `terraform apply`
de nuevo: el `null_resource.deploy_app` detecta el cambio (hash del jar)
y vuelve a copiar y reiniciar los servicios automáticamente.

## Nota sobre el JWT Authorizer

El authorizer usa como `issuer` `https://sts.windows.net/{tenant}/`,
el mismo formato que ya valida `SecurityConfig.java` en el bff-service
contra el tenant real (el tenant emite tokens v1.0 sin importar la
configuración del manifest de la app registration). Si al probar la
ruta `/v1/{proxy+}` API Gateway devuelve error de autorización pese a
un token válido, revisar que Entra ID esté sirviendo el discovery
document en `https://sts.windows.net/{tenant}/.well-known/openid-configuration`.

## Fuera del alcance del caso oficial

El uso de Terraform/IaC es una decisión explícita del equipo para esta
entrega; el documento del caso indica que la infraestructura como
código no es evaluada. Se documenta aquí para trazabilidad.
