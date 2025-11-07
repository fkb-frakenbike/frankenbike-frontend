FROM node:20-bullseye-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential python3 ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

ENV npm_config_build_from_source='@swc/core'
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

COPY package*.json ./
RUN npm ci --unsafe-perm

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]