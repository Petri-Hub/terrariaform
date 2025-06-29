resource "aws_eip" "terrariaform_elastic_ip" {
  instance = aws_instance.terrariaform_server.id
  tags = {
    Name = "terrariaform-elastic-ip"
  }
}

resource "aws_security_group" "terrariaform_sg" {
  name        = "terrariaform-sg"
  description = "Security group that enables SSH and game connections"

  tags = {
    Name = "terrariaform-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "terrariaform_ssh_allow" {
  description       = "Allow SSH access"
  security_group_id = aws_security_group.terrariaform_sg.id
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "terrariaform_game_allow" {
  description       = "Allow game connections"
  security_group_id = aws_security_group.terrariaform_sg.id
  from_port         = 7777
  to_port           = 7777
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "terrariaform_api_allow" {
  description       = "Allow API requests"
  security_group_id = aws_security_group.terrariaform_sg.id
  from_port         = 3000
  to_port           = 3000
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_egress_rule" "terrariaform_all_egress" {
  description       = "Allow all outbound traffic"
  security_group_id = aws_security_group.terrariaform_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_key_pair" "terrariaform_ssh_key" {
  key_name   = "terrariaform-ssh-key"
  public_key = file(var.aws_ssh_key_path)
}

data "aws_ami" "terrariaform_ami" {
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

resource "aws_instance" "terrariaform_server" {
  ami           = data.aws_ami.terrariaform_ami.id
  instance_type = var.aws_instance_type

  vpc_security_group_ids = [aws_security_group.terrariaform_sg.id]
  key_name               = aws_key_pair.terrariaform_ssh_key.key_name

  tags = {
    Name = "terrariaform-server"
  }

  user_data_replace_on_change = true
  user_data = templatefile("../scripts/startup.sh", {
    env_config = file("../../.env")
  })
}

resource "aws_ebs_volume" "terrariaform_data" {
  availability_zone = aws_instance.terrariaform_server.availability_zone
  size              = 6
  type              = "gp3"
  
  # Prevents accidental destruction of the volume.
  # This would erase all game data.
  lifecycle {
    prevent_destroy = true
  }
  
  tags = {
    Name = "terrariaform-volume"
    Type = "GameData"
  }
}

resource "aws_volume_attachment" "terrariaform_data_attach" {
  device_name = "/dev/xvdb"
  volume_id   = aws_ebs_volume.terrariaform_data.id
  instance_id = aws_instance.terrariaform_server.id
  force_detach = true
}

resource "vercel_project" "terrariaform_web" {
  name = "terrariaform-web"
  framework = "nextjs"
  root_directory = "services/web"

  git_repository = {
    type = "github"
    repo = "Petri-Hub/terrariaform"
  }
}

resource "vercel_deployment" "terrariaform_deploy" {
  project_id = vercel_project.terrariaform_web.id
  production = true
  ref = "master"
}

resource "vercel_project_domain" "terrariaform_domain" {
  project_id = vercel_project.terrariaform_web.id
  domain     = var.vercel_terrariaform_subdomain
}

resource "vercel_dns_record" "terraria_subdomain" {
  domain = var.vercel_domain_name
  type   = "A"
  name   = var.vercel_terraria_subdomain
  value  = aws_eip.terrariaform_elastic_ip.public_ip
  ttl    = 60
}

resource "supabase_project" "terrariaform" {
  organization_id   = var.supabase_organization_id
  name              = "terrariaform"
  database_password = var.supabase_db_password
  region            = var.supabase_region

  # Prevents accidental destruction of the database.
  # This would erase all server monitoring data.
  lifecycle {
    prevent_destroy = true
  }
}

