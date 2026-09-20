#!/bin/bash
set -eux

dnf update -y
dnf install -y docker java-17-amazon-corretto

systemctl enable docker
systemctl start docker
usermod -aG docker ec2-user

mkdir -p /var/lib/mesatech/postgres
mkdir -p /opt/mesatech

# Postgres en Docker, igual que en docker/docker-compose.yml del entorno local.
docker run -d \
  --name mesatech-postgres \
  --restart unless-stopped \
  -e POSTGRES_DB=${db_name} \
  -e POSTGRES_USER=${db_user} \
  -e POSTGRES_PASSWORD=${db_password} \
  -p ${db_port}:5432 \
  -v /var/lib/mesatech/postgres:/var/lib/postgresql/data \
  postgres:16
