# Architectural Structural Analysis
- Run app.py at first.
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