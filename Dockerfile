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
RUN yum install -y mod_proxy_uwsgi
RUN yum clean all

# uWSGIをインストール
RUN pip3 install uwsgi

# アプリケーションのコードをコピー
COPY ./api /var/www/html/arch-struct-analysis/api
COPY ./frontend /var/www/html/arch-struct-analysis/frontend

# requirements.txtを使って依存関係をインストール
RUN pip3 install -r /var/www/html/arch-struct-analysis/api/requirements.txt

# Apacheの設定ファイルをコピー
COPY ./arch-struct-analysis.conf /etc/httpd/conf.d/arch-struct-analysis.conf

# uWSGIの設定ファイルをコピー
COPY ./arch-struct-analysis.ini /var/www/html/arch-struct-analysis/arch-struct-analysis.ini

# ファイルの所有者を変更
RUN chown -R apache:apache /var/www/html/arch-struct-analysis
RUN chmod -R 755 /var/www/html/arch-struct-analysis

# ログディレクトリの設定
RUN chown -R root:apache /var/log/httpd
RUN chmod 750 /var/log/httpd

# Flaskアプリケーション用のエントリーポイントスクリプトを作成
COPY ./start-server.sh /start-server.sh
RUN chmod +x /start-server.sh
CMD ["/start-server.sh"]
