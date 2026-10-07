FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
RUN mkdir -p /app/data && chown node:node /app/data
USER node
ENV HOST=0.0.0.0 PORT=12345 DATA_DIR=/app/data
EXPOSE 12345
CMD ["node", "src/server.mjs"]
