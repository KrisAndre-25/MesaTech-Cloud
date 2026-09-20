# Copia los .jar ya compilados (gradlew bootJar en cada servicio) y los
# deja corriendo como servicios systemd en la instancia EC2. Los
# "triggers" con filemd5 hacen que un nuevo `terraform apply` vuelva a
# desplegar automáticamente cuando alguno de los jars cambió.
locals {
  bff_jar         = "${var.jar_build_dir}/bff-service/build/libs/bff-service-${var.app_version}.jar"
  solicitudes_jar = "${var.jar_build_dir}/solicitudes-service/build/libs/solicitudes-service-${var.app_version}.jar"
  catalogo_jar    = "${var.jar_build_dir}/catalogo-service/build/libs/catalogo-service-${var.app_version}.jar"
}

resource "null_resource" "deploy_app" {
  depends_on = [aws_instance.app]

  triggers = {
    instance_id      = aws_instance.app.id
    bff_jar_hash     = filemd5(local.bff_jar)
    solicitudes_hash = filemd5(local.solicitudes_jar)
    catalogo_hash    = filemd5(local.catalogo_jar)
  }

  connection {
    type        = "ssh"
    user        = "ec2-user"
    host        = aws_instance.app.public_ip
    private_key = tls_private_key.app.private_key_pem
    timeout     = "5m"
  }

  # Espera a que cloud-init termine (Docker + Postgres arriba) antes de tocar nada.
  provisioner "remote-exec" {
    inline = [
      "sudo cloud-init status --wait",
      "sudo mkdir -p /opt/mesatech",
      "sudo chown ec2-user:ec2-user /opt/mesatech",
    ]
  }

  provisioner "file" {
    source      = local.bff_jar
    destination = "/opt/mesatech/bff-service.jar"
  }

  provisioner "file" {
    source      = local.solicitudes_jar
    destination = "/opt/mesatech/solicitudes-service.jar"
  }

  provisioner "file" {
    source      = local.catalogo_jar
    destination = "/opt/mesatech/catalogo-service.jar"
  }

  provisioner "file" {
    content = templatefile("${path.module}/templates/systemd.service.tpl", {
      description  = "MesaTech BFF Service"
      jar_filename = "bff-service.jar"
      db_password  = var.db_password
    })
    destination = "/tmp/bff-service.service"
  }

  provisioner "file" {
    content = templatefile("${path.module}/templates/systemd.service.tpl", {
      description  = "MesaTech Solicitudes Service"
      jar_filename = "solicitudes-service.jar"
      db_password  = var.db_password
    })
    destination = "/tmp/solicitudes-service.service"
  }

  provisioner "file" {
    content = templatefile("${path.module}/templates/systemd.service.tpl", {
      description  = "MesaTech Catalogo Service"
      jar_filename = "catalogo-service.jar"
      db_password  = var.db_password
    })
    destination = "/tmp/catalogo-service.service"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mv /tmp/bff-service.service /tmp/solicitudes-service.service /tmp/catalogo-service.service /etc/systemd/system/",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable --now catalogo-service",
      "sudo systemctl enable --now solicitudes-service",
      "sudo systemctl enable --now bff-service",
      "sudo systemctl restart catalogo-service solicitudes-service bff-service",
    ]
  }
}
