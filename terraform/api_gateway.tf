# HTTP API con un JWT Authorizer que valida los tokens de Microsoft
# Entra ID directamente en el borde (API Gateway), antes de reenviar a
# la EC2. El issuer usa el formato v1.0 (sts.windows.net) porque es el
# que efectivamente emite el tenant — se confirmó que ese endpoint sí
# publica /.well-known/openid-configuration porque es el mismo que usa
# JwtDecoders.fromIssuerLocation(...) en SecurityConfig.java del
# bff-service (backend en funcionamiento contra el tenant real).
locals {
  entra_issuer = "https://sts.windows.net/${var.entra_tenant_id}/"
}

resource "aws_apigatewayv2_api" "http_api" {
  name          = "mesatech-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.cors_allowed_origins
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["Authorization", "Content-Type", "X-User-Id"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_authorizer" "entra_jwt" {
  api_id           = aws_apigatewayv2_api.http_api.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "entra-id-jwt-authorizer"

  jwt_configuration {
    audience = [var.entra_api_client_id]
    issuer   = local.entra_issuer
  }
}

resource "aws_apigatewayv2_integration" "bff_proxy" {
  api_id             = aws_apigatewayv2_api.http_api.id
  integration_type   = "HTTP_PROXY"
  integration_method = "ANY"
  # El BFF expone sus rutas bajo /v1/** (ver BffController), por lo que
  # el prefijo "v1" se preserva al reenviar la solicitud.
  integration_uri        = "http://${aws_instance.app.public_ip}:${var.app_port}/v1/{proxy}"
  payload_format_version = "1.0"
  connection_type        = "INTERNET"
}

resource "aws_apigatewayv2_route" "proxy" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "ANY /v1/{proxy+}"
  target             = "integrations/${aws_apigatewayv2_integration.bff_proxy.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.entra_jwt.id
}

# "ANY /v1/{proxy+}" tambien captura OPTIONS, y un preflight de CORS real
# nunca lleva el header Authorization: el JWT Authorizer lo rechazaria con
# 401 y el navegador interpretaria eso como una falla de CORS antes de
# siquiera intentar la peticion real. Una ruta especifica para OPTIONS
# tiene prioridad sobre la ANY para ese metodo, se reenvia sin autorizar
# y el propio bff-service ya responde el preflight (SecurityConfig.java
# permite OPTIONS "/**" y expone su propio CorsConfigurationSource).
resource "aws_apigatewayv2_route" "proxy_options" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "OPTIONS /v1/{proxy+}"
  target             = "integrations/${aws_apigatewayv2_integration.bff_proxy.id}"
  authorization_type = "NONE"
}

resource "aws_apigatewayv2_integration" "version_proxy" {
  api_id             = aws_apigatewayv2_api.http_api.id
  integration_type   = "HTTP_PROXY"
  integration_method = "GET"
  # BffV2Controller#version(): GET /v2/version, sin autenticacion.
  integration_uri        = "http://${aws_instance.app.public_ip}:${var.app_port}/v2/version"
  payload_format_version = "1.0"
  connection_type        = "INTERNET"
}

resource "aws_apigatewayv2_route" "version" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /v2/version"
  target             = "integrations/${aws_apigatewayv2_integration.version_proxy.id}"
  authorization_type = "NONE"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}
