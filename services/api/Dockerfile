FROM oven/bun:1
WORKDIR /api

COPY package*.json ./
COPY prisma ./prisma
RUN bun install

COPY . .
RUN bunx prisma generate
RUN bunx prisma migrate deploy

EXPOSE 3000
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
