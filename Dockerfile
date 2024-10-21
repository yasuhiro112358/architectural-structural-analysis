FROM ubuntu:24.04

RUN apt-get update -y

RUN apt-get install -y python3
RUN apt-get install -y python3-pip 
RUN apt-get install -y python3-setuptools 
RUN apt-get install -y python3-dev
RUN apt-get install -y libffi-dev 
RUN apt-get install -y openssl 
RUN apt-get install -y libssl-dev 
RUN apt-get install -y apache2 
RUN apt-get install -y apache2-dev 
RUN apt-get install -y gcc 
RUN apt-get install -y procps
RUN apt-get install -y libapache2-mod-php 
RUN apt-get install -y php 
RUN apt-get install -y php-cli 
RUN apt-get install -y php-mysql 
RUN apt-get install -y php-fpm 
RUN apt-get install -y vim
RUN apt-get install -y python3-venv

RUN apt-get clean

# mod_rewriteを有効にする
RUN a2enmod rewrite

# Python仮想環境を作成
RUN python3 -m venv /opt/venv

# 仮想環境をアクティベートし、uWSGIをインストール
RUN /opt/venv/bin/pip install uwsgi

# 必要なパッケージをインストール
# RUN yum install -y mod_proxy_uwsgi


# アプリケーションのコードをコピー
COPY ./api /var/www/html/arch-struct-analysis/api
COPY ./frontend /var/www/html/arch-struct-analysis/frontend

# requirements.txtを使って依存関係をインストール
RUN /opt/venv/bin/pip install -r /var/www/html/arch-struct-analysis/api/requirements.txt

# Apacheの設定ファイルをコピー
COPY ./etc/apache2/apache2.conf /etc/apache2/apache2.conf
COPY ./etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./etc/apache2/sites-available/arch-struct-analysis.conf /etc/apache2/sites-available/arch-struct-analysis.conf

# uWSGIの設定ファイルをコピー
COPY ./var/www/html/arch-struct-analysis/arch-struct-analysis.ini /var/www/html/arch-struct-analysis/arch-struct-analysis.ini

# ファイルの所有者を変更
RUN chown -R www-data:www-data /var/www/html/arch-struct-analysis
RUN chmod -R 755 /var/www/html/arch-struct-analysis

# ログディレクトリの設定
RUN chown -R root:www-data /var/log/apache2
RUN chmod 750 /var/log/apache2

# Flaskアプリケーション用のエントリーポイントスクリプトを作成
COPY ./start-server.sh /start-server.sh
RUN chmod +x /start-server.sh
CMD ["/start-server.sh"]
