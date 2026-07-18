# ЭТАП 1: Сборка проекта через Node.js
FROM node:22-alpine AS build
WORKDIR /app

# Копируем package.json и устанавливаем пакеты
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь код фронта и собираем его (создается папка dist)
COPY . .
RUN npm run build

# ЭТАП 2: Раздача статики через Nginx
FROM nginx:alpine
# Копируем собранный сайт из первого этапа
COPY --from=build /app/dist /usr/share/nginx/html
# Заменяем стандартный конфиг Nginx на наш
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]