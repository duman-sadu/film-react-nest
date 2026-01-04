# Используем официальный nginx образ
FROM nginx:latest

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 80
EXPOSE 80

# Запускаем nginx в foreground
CMD ["nginx", "-g", "daemon off;"]