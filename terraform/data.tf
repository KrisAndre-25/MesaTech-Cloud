# AWS Academy no permite crear roles IAM propios: se reutiliza el
# LabInstanceProfile / LabRole que el laboratorio ya provisiona.
data "aws_iam_instance_profile" "lab" {
  name = "LabInstanceProfile"
}

# Se usa la VPC y subred por defecto de la cuenta de Academy en vez de
# crear networking propio (fuera del alcance de este proyecto y de los
# permisos habituales del Learner Lab).
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}
