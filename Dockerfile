FROM node:22.12.0-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY . .

ARG VITE_SITE_URL=https://cv.dotka.xyz
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
