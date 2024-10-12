# Amazon Linux 2023ベースのイメージを使用
FROM amazonlinux:2023

# 必要なパッケージをインストール
RUN yum update -y
RUN yum install -y python3
RUN yum install -y python3-pip
RUN yum install -y python3-setuptools
RUN yum install -y python3-devel
RUN yum install -y libffi-devel
RUN yum install -y openssl-devel
RUN yum install -y httpd
RUN yum install -y httpd-devel
RUN yum install -y gcc
RUN yum install -y procps 
RUN yum clean all

# RUN pip3 install flask
RUN pip3 install uwsgi


# 仮想環境の作成
# RUN python3 -m venv /var/www/my_flask_app/venv
# RUN source /var/www/my_flask_app/venv/bin/activate

# 仮想環境を有効化して、FlaskとuWSGIをインストール
# RUN source /var/www/my_flask_app/venv/bin/activate
# RUN /var/www/my_flask_app/venv/bin/pip install flask
# RUN /var/www/my_flask_app/venv/bin/pip install uwsgi


# アプリケーションのコードをコピー
COPY ./api /var/www/my_flask_app/api
COPY ./frontend /var/www/my_flask_app/frontend
COPY ./my_flask_app.ini /var/www/my_flask_app/my_flask_app.ini
# requirements.txtを使って依存関係をインストール
RUN pip3 install -r /var/www/my_flask_app/api/requirements.txt

# Apacheの設定ファイルをコピー
COPY ./my_flask_app.conf /etc/httpd/conf.d/my_flask_app.conf

# Flaskアプリケーション用のWSGIエントリポイントをコピー
# COPY ./my_flask_app.wsgi /var/www/my_flask_app/my_flask_app.wsgi

# uWSGI設定ファイルのコピー
# COPY ./uwsgi.ini /var/www/my_flask_app/uwsgi.ini

# ファイルの所有者を変更
RUN chown -R apache:apache /var/www/my_flask_app
RUN chmod -R 755 /var/www/my_flask_app

# ログディレクトリの設定
RUN chown -R root:apache /var/log/httpd
RUN chmod 750 /var/log/httpd
# RUN chmod 640 /var/log/httpd/*


# ポート80を公開
# EXPOSE 80

# Flaskアプリケーション用のエントリーポイントスクリプトを作成
COPY ./start-server.sh /start-server.sh
RUN chmod +x /start-server.sh
# サーバーの起動
CMD ["/start-server.sh"]
