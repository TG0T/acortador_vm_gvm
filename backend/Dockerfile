FROM node:20-alpine AS deps
WORKDIR /Acortador
COPY package*.json ./
RUN npm install

FROM node:20-alpine as runner
WORKDIR /Acortador
COPY --from=deps /Acortador/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]