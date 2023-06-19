"""INTEGRA 2023 Platform Server Main File

This file is part of the INTEGRA 2023 platform flask server.
It integrates the configuration and initialization classes of the server, additionally it attends the HTTP requests for the root address and the start module.

@Author: Mateo Barrera
         Alex Pinchao
@Date: 12-07-2022  
"""
import unittest

from jinja2 import UndefinedError
from flask import Flask, request, make_response, render_template, redirect, session, url_for, flash, Response
from app import create_app
from flask_login import login_required, current_user
from app.db import SQLConnector

app = create_app()
app.db_object = SQLConnector()


@app.cli.command()
def test():
    """OPTIONAL
    Construction of automatic integration tests
    """    
    tests = unittest.TestLoader().discover('test')
    unittest.TextTestRunner().run(tests)

#Si se require inicializar datos de cookies de pueden establecer desde este punto
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

#DONE
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

#Desarrollo frontend para la vista de error
#Integración y respuesta a otros errores HTTP
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

#DONE
@app.route('/home', methods=['GET', 'POST'])
def home():
    """Home method - welcome page

    Returns:
        server response: Home-page for platform welcome
    """    
    text_module_db = 'En el módulo de base de datos se recopila información de las variables e indicadores de eficiencia energética asociados a los procesos de generación, distribución y uso final de la energía eléctrica en Colombia.'
    text_module_calc = 'En el módulo de escenario base .....'
    text_module_anl = 'En el módulo de escenario base ......'

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


#Implementar respuesta del server al POST del formulario
#Depurar método contact
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact Form method

    Returns:
        server response: platform contact form
    """    
    if current_user.is_authenticated:
        user_ip = session.get('user_ip')
        username = current_user.id
        context = {
            'user_ip': user_ip,
            'username': username,
            'anonymous': False,
        }
    context = {
        'anonymous': True,
        'user_ip': "UserIp",
    }
    return render_template('home/contact.html', **context)

#DONE
@app.route('/robots.txt')
def noindex():
    """This file restricts the activity of search engine crawlers and stop their access to app.

    Returns:
        HTTP response: text plain response
    """    
    r = Response(response="User-Agent: *\nAllow: /\nDisallow: /dashboard/",
                 status=200, mimetype="text/plain")
    r.headers["Content-Type"] = "text/plain; charset=utf-8"
    return r

#Código para reciclar 
""" @app.route('/hello', methods=['GET', 'POST'])
@login_required
def hello():
    user_ip = session.get('user_ip')
    username = current_user.id
    todo_form = TodoForms()
    delete_form = DeleteTodoForm()
    update_form = UpdateTodo()
    context = {
        'user_ip': user_ip,
        'todos': None,
        'username': username,
        'todo_form': todo_form,
        'delete_form': delete_form,
        'update_form': update_form
    }
    if todo_form.validate_on_submit():
        put_todo(username, todo_form.description.data)
        flash('Tarea registrada con exito.')
        return redirect(url_for('hello'))

    return render_template('hello.html', **context)


@app.route('/todos/delete/<todo_id>', methods=['POST'])
def delete(todo_id):
    user_id = current_user.id
    delete_todo(user_id, todo_id)
    return redirect(url_for('hello'))


@app.route('/todos/update/<todo_id>/<int:done>', methods=['POST'])
def update(todo_id, done):
    user_id = current_user.id
    update_todo(user_id, todo_id, done)
    return redirect(url_for('hello')) """


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
