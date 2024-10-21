#!/bin/bash

# Apacheをフォアグラウンドで起動
apache2ctl -D FOREGROUND &

# PHP-FPMをフォアグラウンドで起動
php-fpm8.3 -F &

# uWSGIを起動してFlaskアプリケーションを実行
/opt/venv/bin/uwsgi --ini /etc/uwsgi/sites/arch-struct-analysis.ini
