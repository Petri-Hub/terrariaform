variable "region" {
  description = "AWS region"
  type        = string
}

variable "instance_type" {
  description = "AWS instance type"
  type        = string
}

variable "ssh_key_path" {
  description = "Path to the AWS instance SSH key"
  type        = string
  sensitive = true
}

variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive = true
}