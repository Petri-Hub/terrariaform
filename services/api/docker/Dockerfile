FROM oven/bun:1
WORKDIR /api

COPY ../ .
RUN bun install

EXPOSE 3000
ENTRYPOINT [ "bun", "run", "src/index.ts" ]