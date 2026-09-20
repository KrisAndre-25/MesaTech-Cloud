output "ec2_public_ip" {
  description = "IP pública de la instancia EC2 donde corren los 3 microservicios y Postgres"
  value       = aws_instance.app.public_ip
}

output "ssh_command" {
  description = "Comando para conectarse por SSH a la instancia (usa la clave generada por Terraform)"
  value       = "ssh -i ${path.module}/mesatech-key.pem ec2-user@${aws_instance.app.public_ip}"
}

output "api_gateway_invoke_url" {
  description = "URL base del API Gateway HTTP API (usar como REACT_APP_API_URL en el frontend)"
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "bff_direct_url" {
  description = "URL directa al bff-service en la EC2 (sin pasar por API Gateway, útil para depurar)"
  value       = "http://${aws_instance.app.public_ip}:${var.app_port}"
}
