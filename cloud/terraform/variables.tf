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

variable "vercel_team_id" {
  description = "Vercel team ID for managing the domain"
  type        = string
}

variable "vercel_domain_name" {
  description = "The domain name managed by Vercel"
  type        = string
  default     = "petri.codes"
}

variable "vercel_terraria_subdomain" {
  description = "The subdomain for the Terraria server"
  type        = string
  default     = "terraria"
}