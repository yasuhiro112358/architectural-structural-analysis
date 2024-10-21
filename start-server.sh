#!/bin/bash

# Apacheをフォアグラウンドで起動
apache2ctl -D FOREGROUND &

# PHP-FPMをフォアグラウンドで起動
php-fpm8.3 -F &

# uWSGIを起動してFlaskアプリケーションを実行
/opt/venv/bin/uwsgi --ini /var/www/html/arch-struct-analysis/arch-struct-analysis.ini
