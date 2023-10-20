from flask import Flask, render_template, request, flash, redirect, url_for
from flask_bootstrap import Bootstrap
import random
import string

app = Flask(__name__)
Bootstrap(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Reemplaza 'your_secret_key' por una clave segura

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_password', methods=['POST'])
def generate_password():
    length = int(request.form['length'])
    use_lowercase = 'lowercase' in request.form
    use_uppercase = 'uppercase' in request.form
    use_digits = 'digits' in request.form
    use_special_chars = 'special_chars' in request.form

    if not (use_lowercase or use_uppercase or use_digits or use_special_chars):
        flash("Debes seleccionar al menos una opción.", 'danger')

    characters = ''
    if use_lowercase:
        characters += string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_digits:
        characters += string.digits
    if use_special_chars:
        characters += string.punctuation

    if not characters:
        flash("Debes seleccionar al menos una opción.", 'danger')

    password = ''.join(random.choice(characters) for _ in range(length))
    return password




if __name__ == '__main__':
    app.run(debug=True)
