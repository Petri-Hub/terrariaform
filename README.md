<h1 align="center">🌳 terrariaform</h1>

<br>

<h3 align="center">A modded Terraria server deployed with Terraform.<br>Stopped in August 2025, before its control panel was built</h3>

<p align="center">
  <img alt="Top language" src="https://img.shields.io/github/languages/top/Petri-Hub/terrariaform" /> <a href="https://github.com/Petri-Hub/terrariaform/commits/master"><img alt="Last commit" src="https://img.shields.io/github/last-commit/Petri-Hub/terrariaform" /></a>
</p>

<br>

## About

> **TL;DR:** Terraria plus Terraform. A tModLoader server for friends, brought up on AWS with one `terraform apply`, with the world kept on a volume that outlives the instance. It's also where I first used EC2 and Terraform, both of which I went on to work with in production.

## What it deploys

| Resource | What for |
|---|---|
| **EC2 on Debian 12** | Runs the game server and a small API. The Debian image is looked up at plan time |
| **EBS volume, 6 GB** | Keeps the world. `prevent_destroy` stops a `terraform destroy` from erasing it |
| **Elastic IP** | Keeps the same address across restarts |
| **Security group** | Opens the game port, the API port and SSH |
| **Vercel** | A subdomain pointing at the Elastic IP, plus the project for the control panel |
| **Supabase** | A project for server monitoring data, also protected by `prevent_destroy` |

On boot, the instance formats the volume if it's new, mounts it and registers it to mount again after a reboot, installs Docker, clones this repository and starts the compose file.

## The API on the box

A [Hono](https://hono.dev) service running on Bun next to the game server, behind a bearer token. It answers what people ask about a game server: `/system` reports the host's CPU, memory and OS, `/containers` reports usage per container, and `/health` says whether it's up.

## What's inside

```sh
├── cloud
│   ├── scripts         # the startup script the instance runs on boot
│   └── terraform       # AWS, Vercel and Supabase in one plan
├── services
│   ├── api             # the Hono API that reports on the host and containers
│   └── web             # the Next.js control panel, never past its first page
└── docker-compose.yml  # the tModLoader server and the API
```

## Technologies

<table align="center">
  <tr>
    <td align="center" width="96"><img src="https://cdn.simpleicons.org/terraform" width="48" height="48" alt="Terraform" /><br>Terraform</td>
    <td align="center" width="96"><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/amazon-web-services-light.svg" width="48" height="48" alt="AWS" /><br>AWS</td>
    <td align="center" width="96"><img src="https://cdn.simpleicons.org/docker" width="48" height="48" alt="Docker" /><br>Docker</td>
    <td align="center" width="96"><img src="https://cdn.simpleicons.org/hono" width="48" height="48" alt="Hono" /><br>Hono</td>
    <td align="center" width="96"><img src="https://cdn.simpleicons.org/bun/F9F1E1" width="48" height="48" alt="Bun" /><br>Bun</td>
    <td align="center" width="96"><img src="https://cdn.simpleicons.org/vercel/9198A1" width="48" height="48" alt="Vercel" /><br>Vercel</td>
    <td align="center" width="96"><img src="https://cdn.simpleicons.org/supabase" width="48" height="48" alt="Supabase" /><br>Supabase</td>
  </tr>
</table>
