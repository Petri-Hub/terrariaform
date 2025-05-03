terraform {
  required_providers {
    vultr = {
      source = "vultr/vultr"
      version = "2.26.0"
    }
  }
}

provider "vultr" {
  api_key = var.api_key
}

resource "vultr_instance" "terrariaform-server" {
  label = "terrariaform-server"
  plan = var.instance
  region = var.region
  os_id = var.os
  script_id = vultr_startup_script.terrariaform-startup-script.id
  firewall_group_id = vultr_firewall_group.terrariaform-firewall.id 
  ssh_key_ids = [vultr_ssh_key.terrariaform_ssh_key.id]

}

resource "vultr_startup_script" "terrariaform-startup-script" {
  name        = "terrariaform-startup-script"
  script      = base64encode(file("../scripts/startup.sh"))
  type        = "boot"
}

resource "vultr_firewall_group" "terrariaform-firewall" {
  description = "Base firewall group for Terrariaform"
}

resource "vultr_firewall_rule" "terrariaform-firewall-rule" {
  firewall_group_id = vultr_firewall_group.terrariaform-firewall.id
  protocol          = "tcp"
  port              = "7777"
  subnet = "0.0.0.0"
  subnet_size = 0
  ip_type = "v4"
}

resource "vultr_firewall_rule" "terrariaform-firewall-rule-ssh" {
  firewall_group_id = vultr_firewall_group.terrariaform-firewall.id
  protocol          = "tcp"
  port              = "22"
  subnet = "0.0.0.0"
  subnet_size = 0
  ip_type = "v4"
}

resource "vultr_ssh_key" "terrariaform_ssh_key" {
  name    = "terrariaform-key"
  ssh_key = var.public_ssh_key
}



