from flask import Flask, request, redirect, url_for, session
from google import genai

# Criando a aplicação
app = Flask(__name__)
app.secret_key = 'abc123'

# Lista de rotas
# Home
@app.route("/", methods=["GET", "POST"])
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
@app.route("/api")
def gemini():
    API_KEY = "SUA_API_KEY"
    # Carregando a variavel de sessão
    prompt = session.get('prompt')

    client = genai.Client(api_key=API_KEY)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents= prompt,
    )
    return response.text

# Iniciando servidor
if __name__ == "__main__":
    app.run(debug=True, port=5153)
