resource "aws_security_group" "app" {
  name        = "mesatech-app-sg"
  description = "Acceso SSH para administracion y HTTP al bff-service (unico punto de entrada publico)"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH para despliegue y administracion"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  ingress {
    description = "bff-service (API Gateway reenvia aqui como HTTP_PROXY)"
    from_port   = var.app_port
    to_port     = var.app_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Salida libre (descarga de paquetes, imagenes Docker, etc.)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "mesatech-app-sg"
    Project = "MesaTech Cloud"
  }
}
