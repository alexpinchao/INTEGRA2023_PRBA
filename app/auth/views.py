from flask import render_template, redirect, flash, url_for, session, current_app as app
from app.forms import LoginForm, SignupForm, RecoveryForm
from . import auth
from app.models import UserData, UserModel
from flask_login import login_required, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import secure

secure_headers = secure.Secure()

@auth.after_request
def set_secure_headers(response):
    secure_headers.framework.flask(response)
    return response

@auth.route('/login', methods=['GET', 'POST'])
def login():
    return redirect(url_for('dashboard.main'))
    login_form = LoginForm()
    val_name = False
    val_cont = False
    context = {
        'login_form': login_form,
        'val_name': val_name,
        'val_cont': val_cont,
    }

    if login_form.validate_on_submit():
        username = login_form.username.data
        password = login_form.password.data
        user = app.db_object.get_user(username)
        print("######USER {}".format(user))
        if user:
            user = user[0]
            password_from_db =user['password']        
            if check_password_hash(password_from_db, password):
                user_data = UserData(username, password)
                user = UserModel(user_data)
                login_user(user)
                flash('Bienvenido de Nuevo.')
                session['username'] = username
                session['admin_session'] = False
                return redirect(url_for('dashboard.main'))
            else:
                context['val_cont'] = False
                flash('La información no coincide')
        else:
            ##Revisar##
            context['val_name'] = True
    return render_template('auth/login.html', **context)


@auth.route('signup', methods=['GET', 'POST'])
def signup():
    signup_form = SignupForm()
    context = {
        'signup_form': signup_form,
    }
    if signup_form.validate_on_submit():
        username = signup_form.username.data
        password = signup_form.password.data
        users_db = app.db_object.get_user(username)

        if not users_db:
            print('aqui va')
            password_hash = generate_password_hash(password)
            user_new = app.db_object.set_user(username, password_hash)
            if user_new:
                user_new = user_new[0]
                print("////////////////////////////")
                print(user_new)
                app.db_object.set_user_data(
                    user_new['idlogin'], name=username, organization="Univalle")
                user_data = UserData(username, password_hash)
                user = UserModel(user_data)
                login_user(user)
                flash('Bienvenido!')
                return redirect(url_for('dashboard.main'))
        else:
            flash('El usuario ya existe.')

    return render_template('auth/signup.html', **context)

@auth.route('account-recovery', methods=['GET', 'POST'])
def recovery():
    recovery_form = RecoveryForm()
    context = {
        'recovery_form': recovery_form,
    }
    return render_template('auth/account_recovery.html', **context)


@auth.route('logout')
@login_required
def logout():
    logout_user()
    flash('Regresa Pronto.')
    return redirect(url_for('auth.login'))
