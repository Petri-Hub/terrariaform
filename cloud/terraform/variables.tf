variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "aws_instance_type" {
  description = "AWS instance type"
  type        = string
}

variable "aws_ssh_key_path" {
  description = "Path to the AWS instance SSH key"
  type        = string
  sensitive = true
}

variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive = true
}