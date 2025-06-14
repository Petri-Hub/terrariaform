The purpose of this repository is to deploy a Moded Terraria (TModloader) game server on AWS servers using Terraform.

The game server runs through an Docker Compose image 'jacobsmile/tmodloader1.4:latest' that solves most of the setup problems you could've have.

There is also an additional API that serves to monitor and interact with the game server. It's a Javascript API that uses the Hono Framework.

My goal is to deploy a Terraria server on AWS in a way me and my friends can:

- Play on it with mods
- Pause the game server to reduce costs
- Resume the game server
- Ensure no progress is lost (Worlds, Players, etc)