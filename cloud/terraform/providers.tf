terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "vercel" {
  api_token = var.vercel_api_token
  team = var.vercel_team_id
}

provider "supabase" {
  access_token = var.supabase_access_token
}