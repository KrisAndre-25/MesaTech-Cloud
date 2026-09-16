# Se genera un key pair nuevo con Terraform en vez de pedirle al alumno
# que cree uno manualmente en la consola: la clave privada queda en
# mesatech-key.pem (ignorada por git) y se reutiliza para los
# provisioners SSH que copian los .jar y configuran systemd.
resource "tls_private_key" "app" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "app" {
  key_name   = "mesatech-key"
  public_key = tls_private_key.app.public_key_openssh
}

resource "local_sensitive_file" "private_key" {
  content         = tls_private_key.app.private_key_pem
  filename        = "${path.module}/mesatech-key.pem"
  file_permission = "0400"
}
