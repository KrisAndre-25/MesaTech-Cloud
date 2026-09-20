variable "aws_region" {
  description = "Región de AWS Academy (Learner Lab está fijado a us-east-1)."
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Tipo de instancia EC2. t3.micro es el tamaño recomendado en AWS Academy Learner Lab."
  type        = string
  default     = "t3.micro"
}

variable "allowed_ssh_cidr" {
  description = "CIDR permitido para SSH (puerto 22). Restringir a la IP propia en un entorno real; 0.0.0.0/0 solo es aceptable en un laboratorio académico temporal."
  type        = string
  default     = "0.0.0.0/0"
}

variable "app_port" {
  description = "Puerto público donde escucha el bff-service (único servicio expuesto a Internet; los demás microservicios son internos a la instancia)."
  type        = number
  default     = 8080
}

variable "db_port" {
  description = "Puerto host donde se publica el contenedor de Postgres (debe coincidir con spring.datasource.url de los application.properties, que apunta a localhost:5433)."
  type        = number
  default     = 5433
}

variable "db_name" {
  description = "Nombre de la base de datos, igual al usado en docker-compose local."
  type        = string
  default     = "mesatech_db"
}

variable "db_user" {
  description = "Usuario de la base de datos, igual al usado en docker-compose local."
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Password de la base de datos. Definir en terraform.tfvars (no versionado) o pasar por -var."
  type        = string
  default     = "adminpassword"
  sensitive   = true
}

variable "entra_tenant_id" {
  description = "Tenant ID de Microsoft Entra ID (el mismo usado en application.properties del bff-service)."
  type        = string
  default     = "06f1c869-7c5f-43b4-95b1-75bf0354d168"
}

variable "entra_api_client_id" {
  description = "Client ID (App ID) de la app registration mesatech-api expuesta como audiencia del JWT."
  type        = string
  default     = "7442c5c2-5a49-4b98-a70f-b6aec439fd6a"
}

variable "cors_allowed_origins" {
  description = "Orígenes permitidos por CORS en API Gateway. Agregar la URL pública del frontend cuando exista."
  type        = list(string)
  default     = ["http://localhost:3000"]
}

variable "jar_build_dir" {
  description = "Carpeta raíz donde gradle deja los .jar de cada microservicio (build/libs)."
  type        = string
  default     = "../backend"
}

variable "app_version" {
  description = "Sufijo de versión de los jars generados por Gradle (debe coincidir con el 'version' de cada build.gradle)."
  type        = string
  default     = "0.0.1-SNAPSHOT"
}
