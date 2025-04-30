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

resource "vultr_ssh_key" "terrariaform_ssh_key" {
  name    = "terrariaform-key"
  ssh_key = var.public_ssh_key
}


resource "vultr_startup_script" "terrariaform-startup-script" {
  name        = "terrariaform-startup-script"
  script      = base64encode(file("../scripts/startup.sh"))
  type        = "boot"
}

resource "vultr_instance" "terrariaform-server" {
  label = "terrariaform-server"
  plan = var.instance
  region = var.region
  os_id = var.os
  script_id = vultr_startup_script.terrariaform-startup-script.id
  ssh_key_ids = [vultr_ssh_key.terrariaform_ssh_key.id]
}