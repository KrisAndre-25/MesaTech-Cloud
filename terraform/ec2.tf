resource "aws_instance" "app" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = var.instance_type
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.app.id]
  iam_instance_profile   = data.aws_iam_instance_profile.lab.name
  key_name               = aws_key_pair.app.key_name

  user_data = templatefile("${path.module}/templates/user_data.sh.tpl", {
    db_name     = var.db_name
    db_user     = var.db_user
    db_password = var.db_password
    db_port     = var.db_port
  })

  tags = {
    Name    = "mesatech-app"
    Project = "MesaTech Cloud"
  }
}
