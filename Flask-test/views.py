from main import app
from flask import render_template, request, redirect, url_for, session
from google import genai


# Home
@app.route("/")
def homep():
    return "HOME"


@app.route("/g", methods=["GET", "POST"])
def home():
    if request.method == 'POST':
        
        # Pegar o prompt/arquivo
        prompt = request.form['prompt']
        # Criando uma variavel de sessão para armazenar o prompt
        session['prompt'] = prompt
        # redirecionando a rota para a aplicação da API
        return redirect('/api')
    
    return '''
        <form method="POST">
            Prompt: <input type="text" name ="prompt" /> </br>
            <input type="submit" value="Entrar">
        </form>    
    '''


# API rota
@app.route("/api") # route 
def gemini():
    API_KEY = "AIzaSyBo9G4PyPKKbfxDnNu2QnHdDhB7kK_iQoc"
    # Carregando a variavel de sessão
    prompt = session.get('prompt')

    client = genai.Client(api_key=API_KEY)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents= prompt,
    )
    return response.text

