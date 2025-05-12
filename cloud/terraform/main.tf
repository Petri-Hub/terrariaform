terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_ami" "terrariaform-ami" {
  most_recent = true
  owners      = ["136693071363"] # Debian project owner ID

  filter {
    name   = "name"
    values = ["debian-12-amd64-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  
  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
}

resource "aws_ami" "terrariaform-ami" {
  name = "terrariaform-ami"
}

resource "aws_instance" "example" {
  ami           = data.aws_ami.terrariaform-ami.id
  instance_type = var.instance_type
  
  tags = {
    Name = "terrariaform-server"
  }

  user_data = file("../scripts/startup.sh")
  user_data_replace_on_change = true
}