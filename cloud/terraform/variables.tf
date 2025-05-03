variable "api_key" {
  description = "Vultr API key"
  type        = string
  sensitive   = true  
}

variable "region" {
  description = "Vultr region"
  type        = string
}

variable "instance" {
  description = "Vultr instance type"
  type        = string
}

variable "os" {
  description = "Vultr OS ID"
  type        = string
}

variable "public_ssh_key" {
  description = "Public SSH key for Vultr instance"
  type        = string
  sensitive = true
}