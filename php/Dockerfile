# ローカル環境用
# FROM php:7.4-apache

# Heroku用
FROM --platform=linux/amd64 php:7.4-apache

# Herokuの誤動作への対策
# RUN apt-get update && apt-get install -qy apache2
# RUN rm -rf /etc/apache2
# ENTRYPOINT []
# 下の行は不要かも
# CMD ["find", "/etc/apache2"]

# apache.confの有効化（複数のサーバーを設置する際に必要）
COPY php-frontend.conf /etc/apache2/sites-available/php-frontend.conf
COPY src/ /var/www/html/