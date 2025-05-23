from flask import Flask
from flask import render_template
from views import *

app = Flask(__name__)
app.secret_key = 'abc123'

    
# Iniciando servidor
if __name__ == "__main__":
    app.run()
