# ローカル開発環境用
# FROM python:3.8-slim

# Heroku用
FROM --platform=linux/amd64 python:3.8-slim

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
