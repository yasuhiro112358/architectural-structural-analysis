#!/bin/bash

# Apacheをフォアグラウンドで起動
httpd -D FOREGROUND &

# uWSGIを起動してFlaskアプリケーションを実行
uwsgi --ini /var/www/my_flask_app/my_flask_app.ini