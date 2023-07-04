"""INTEGRA 2023 Platform Server Main File

This file is part of the INTEGRA 2023 platform flask server. It integrates the configuration and initialization
classes of the server, additionally it attends the HTTP requests for the root address and the start module.

@Author: Mateo Barrera
         Alex Pinchao
@Date: 12-07-2022  
"""
from datetime import datetime
import unittest

from flask import request, url_for, make_response, render_template, redirect, session, Response, flash
from app import create_app, db
from app.email import send_email
from flask_login import login_required, current_user
from app.database import SQLConnector

app = create_app()
app.db_object = SQLConnector()


# users = db.table('users', db.metadata, autoload=True, autoload_with=db.engine)


@app.cli.command()
def test():
    """OPTIONAL
    Construction of automatic integration tests
    """
    tests = unittest.TestLoader().discover('test')
    unittest.TextTestRunner().run(tests)


# Si se require inicializar datos de cookies se pueden establecer desde este punto
""" @app.before_first_request
def initialize():
    session.clear() """


@app.context_processor
def inject_template_scope():
    injections = dict()

    def cookies_check():
        value = request.cookies.get('cookie_consent')
        return value == 'true'

    injections.update(cookies_check=cookies_check)
    return injections


# DONE
@app.route('/')
def index():
    """Index method to redirect to home page

    Returns:
        server response: redirect to /home route 
    """
    user_ip = request.remote_addr
    response = make_response(redirect('/home'))
    session['user_ip'] = user_ip
    return response


# Desarrollo frontend para la vista de error
# Integración y respuesta a otros errores HTTP
@app.errorhandler(404)
def not_found(error):
    """HTTP error attention function

    Args:
        error (flask error Handler): 404 Not Found - Raise if a resource does not exist and never existed.

    Returns:
        server response: template html for error
    """
    return render_template('404.html', error=error)


@app.errorhandler(500)
def not_found(error):
    """HTTP error attention function

    Args:
        error (flask error Handler): 500 Server error - Raise if a internal server error appears.

    Returns:
        server response: template html for error
    """
    return render_template('500.html', error=error)


# DONE
@app.route('/home', methods=['GET', 'POST'])
def home():
    """Home method - welcome page

    Returns:
        server response: Home-page for platform welcome
    """
    text_module_db = 'En el módulo de base de datos se recopila información de las variables e indicadores de ' \
                     'eficiencia energética asociados a los procesos de generación, distribución y uso final de la ' \
                     'energía eléctrica en Colombia.'
    text_module_calc = 'En este módulo se visualiza la tendencia histórica de los indicadores de eficiencia ' \
                       'energética del sector eléctrico en Colombia y se incluye la especificación de los modelos de ' \
                       'proyección empleados de cara a la evaluación de estrategias de eficiencia energética'
    text_module_anl = 'En este módulo se construyen y evalúan las estrategias de eficiencia energética mediante ' \
                      'criterios económicos, ambientales y energéticos, al ser proyectadas hacia los años de interés,' \
                      'permitiendo definir las estrategias más viables para el país.'

    if current_user.is_authenticated:
        user_ip = session.get('user_ip')
        username = current_user.id
        context = {
            'user_ip': user_ip,
            'username': username,
            'anonymous': False,
            'text_module_db': text_module_db,
            'text_module_calc': text_module_calc,
            'text_module_anl': text_module_anl,
        }
        return render_template('module/main.html', **context)
    context = {
        'anonymous': True,
        'user_ip': "UserIp",
        'text_module_db': text_module_db,
        'text_module_calc': text_module_calc,
        'text_module_anl': text_module_anl,
    }
    if request.cookies.get('cookie_consent'):
        pass
    return render_template('home/home.html', **context)


# Implementar respuesta del server al POST del formulario
# Depurar método contact
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact Form method

    Returns:
        server response: platform contact form
    """
    context = {
        'anonymous': True,
        'user_ip': "UserIp",
    }
    if request.method == 'POST':
        contact_data = request.form.to_dict()
        contacto_context = {
            'mail': contact_data.get('mail'),
            'name': contact_data.get('name'),
            'identifier': contact_data.get('identifier', '+57'),
            'number': contact_data.get('number'),
            'organization': contact_data.get('organization', 'NA'),
            'message': contact_data.get('message', 'NA'),
            'type_contact': 'contacto',
            'date': datetime.now().strftime("%x"),
            'hour': datetime.now().strftime("%X")
        }
        send_email(contact_data.get('mail'), contacto_context)
        flash("Mensaje enviado")

    if current_user.is_authenticated:
        user_ip = session.get('user_ip')
        username = current_user.id
        context = {
            'user_ip': user_ip,
            'username': username,
            'anonymous': False,
        }
    return render_template('home/contact.html', **context)


#
@app.route('/email', methods=['GET'])
def email():
    context = {
        'mail': "contact_data.get('mail')",
        'name': "contact_data.get('name')",
        'identifier': "contact_data.get('identifier', '+57')",
        'number': "contact_data.get('number')",
        'organization': "contact_data.get('organization', 'NA')",
        'message': "contact_data.get('message', 'NA')",
        'type_contact': 'contacto',
        'date': datetime.now().strftime("%x"),
        'hour': datetime.now().strftime("%X")
    }
    return render_template('home/email_template.html', **context)


#

# DONE
@app.route('/robots.txt')
def noindex():
    """This file restricts the activity of search engine crawlers and stop their access to app.

    Returns:
        HTTP response: text plain response
    """
    r = Response(response="User-Agent: *\nAllow: /\nAllow: /dashboard/",
                 status=200, mimetype="text/plain")
    r.headers["Content-Type"] = "text/plain; charset=utf-8"
    return r


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
