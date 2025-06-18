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
}

variable "vercel_terraria_subdomain" {
  description = "The subdomain for the Terraria game server"
  type        = string
}

variable "vercel_terrariaform_subdomain" {
  description = "The subdomain for the Terrariaform website"
  type        = string
}

variable "supabase_access_token" {
  description = "Supabase access token for managing projects"
  type        = string
  sensitive   = true
}

variable "supabase_db_password" {
  description = "Database password for the Supabase project"
  type        = string
  sensitive   = true
}

variable "supabase_region" {
  description = "Supabase project region"
  type        = string
}

variable "supabase_organization_id" {
  description = "Supabase organization ID"
  type        = string
}