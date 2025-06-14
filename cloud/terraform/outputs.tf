output "server_ip" {
    description = "Server IP address for game connections"
    value = aws_eip.terrariaform_elastic_ip.public_ip
}

output "terraria_subdomain" {
    description = "Subdomain for the Terraria server"
    value = "${var.vercel_terraria_subdomain}.${var.vercel_domain_name}"
}

output "dns_record_id" {
    description = "Vercel DNS record ID for the terraria subdomain"
    value = vercel_dns_record.terraria_subdomain.id
}