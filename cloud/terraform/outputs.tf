output "server_ip" {
    description = "Server IP address for game connections"
    value = aws_eip.terrariaform_elastic_ip.public_ip
}