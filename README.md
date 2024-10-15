# Architectural Structural Analysis
- Input values into forms on index.php, calculating it.

## Docker
```bash
# Build the image
docker build -t my-apache-app .
# -t: name and optionally a tag in the 'name:tag' format

# Run the image
docker run -it my-apache-app /bin/bash
# -it: interactive terminal
```


```bash
# Build the image
python3 -m venv venv
# -m: run library module as a script

# Activate the virtual environment
source venv/bin/activate

# Deactivate the virtual environment
deactivate

# Install the requirements
pip install -r requirements.txt
# -r: read the list of requirements from a file
```

```bash
vim /etc/httpd/conf.d/php.conf
```

```apache
# /etc/httpd/conf.d/php.conf
AddType application/x-httpd-php .php
```


```bash
# Create a repository
aws ecr create-repository --repository-name arch-struct-analysis

# Login to the repository
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 767397934648.dkr.ecr.ap-northeast-1.amazonaws.com

# Push the image to the repository
docker push 767397934648.dkr.ecr.ap-northeast-1.amazonaws.com/arch-struct-analysis:latest
```

```bash
# Login to the repository from EC2
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 767397934648.dkr.ecr.ap-northeast-1.amazonaws.com

# Pull the image from the repository
docker pull 767397934648.dkr.ecr.ap-northeast-1.amazonaws.com/arch-struct-analysis:latest

# Run the image
docker-compose -f docker-compose.prod.yml up -d
```

### SPA (Single Page Application)
.htaccessで全てのリクエストをindex.htmlにリダイレクトする。

```apache
# /var/www/html/arch-struct-analysis/frontend/.htaccess

# If mod_rewrite is enabled, enable URL rewriting
<IfModule mod_rewrite.c>
    # Enable URL rewriting
    RewriteEngine On 

    # Set the base URL for the URL rewriting
    RewriteBase / 

    # Do not rewrite index.html
    RewriteRule ^index\.html$ - [L]

    # Rewrite everything else to index.html
    # Request filename is not file
    RewriteCond %{REQUEST_FILENAME} !-f
    # Request filename is not directory
    RewriteCond %{REQUEST_FILENAME} !-d
    # Rewrite to index.html
    RewriteRule . /index.html [L]
</IfModule>
```