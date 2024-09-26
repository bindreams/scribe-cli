FROM node:20
WORKDIR /root
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY . .
ENTRYPOINT ["node", "main.js"]
