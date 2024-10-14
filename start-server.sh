#!/bin/bash

# Apacheをフォアグラウンドで起動
httpd -D FOREGROUND &

# PHP-FPMをフォアグラウンドで起動
php-fpm -D &

# uWSGIを起動してFlaskアプリケーションを実行
uwsgi --ini /var/www/html/arch-struct-analysis/arch-struct-analysis.ini
