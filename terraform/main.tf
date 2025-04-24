provider "aws" {
  region = "sa-east-1"
}

data "aws_ssm_parameter" "tmodloader_env" {
  name = "tmodloader_env"
}

resource "aws_instance" "tmodloader_server" {
  ami           = "ami-0c67065b5ac5afe3a" 
  instance_type = "t3a.medium"
  tags = {
    Name = "tmodloader-server-1"
  }
  security_groups = [aws_security_group.tmodloader_sg.name]
  availability_zone = "sa-east-1a"
  user_data_replace_on_change = true
  user_data = <<-EOF
            #!/bin/bash
            # Update the system
            echo "OWN_LOG: Updating the system..."
            yum update -y
            echo "OWN_LOG: System updated!"

            # Install Docker
            echo "OWN_LOG: Installing Docker"
            yum install -y docker
            service docker start
            usermod -a -G docker ec2-user
            echo "OWN_LOG: Docker installed!"

            # Install Docker Compose dependencies
            echo "OWN_LOG: Will install bycript"
            sudo dnf install -y libxcrypt-compat
            echo "OWN_LOG: bycript installed!"

            # Install Docker Compose
            echo "OWN_LOG: Will install Docker compose"
            curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            chmod +x /usr/local/bin/docker-compose
            echo "OWN_LOG: Installed Docker compose successfully!"

            # Install Git
            yum install -y git

            # Clone the repository
            echo "Will clone the repository"
            git clone https://github.com/Petri-Hub/terraria-server.git /home/ec2-user/terraria-server
            echo "Cloned!"

            # Navigate to the project directory
            cd /home/ec2-user/terraria-server

            # Add environment variables
            echo "OWN_LOG: Will add environment variables"
            echo '${data.aws_ssm_parameter.tmodloader_env.value}' > /home/ec2-user/terraria-server/.env
            echo "OWN_LOG: Environment variables added!"
    
            # Run Docker Compose
            docker-compose up -d
            EOF
}

resource "aws_security_group" "tmodloader_sg" {
  name        = "tModLoaderSecurityGroup"
  description = "Allow game trafic and SSH connections"

  ingress { 
    description = "Allow ALL SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow tModloader game server traffic"
    from_port   = 7777
    to_port     = 7777
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}