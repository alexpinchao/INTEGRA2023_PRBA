from flask import render_template, redirect, flash, url_for, session, current_app as app
from app.forms import LoginForm, SignupForm, RecoveryForm
from . import dashboard
from app.models import UserData, UserModel
from flask_login import login_required, login_user, logout_user
import json

#@login_required
@dashboard.route('/analysis', methods=['GET', 'POST'])
def analysis():
    context = {
        'anonymous': False,
        'user_ip': "UserIp",
    }
    return render_template('module/analysis.html', **context)

#@login_required
@dashboard.route('/database', methods=['GET', 'POST'])
def database():
    data, translating_dict = app.db_object.get_distribution()
    data_indicators = app.db_object.get_indicators()
    units = app.db_object.get_units()
    print("------------entra a database-------")
    # print(data)
    #print(data)
    """     json_data = json.dumps(data, ensure_ascii=False)
    print(json_data)
    print(type(json_data)) """
    context = {
        'anonymous': False,
        'user_ip': "UserIp",
        'data':data,
        'translating_dict':translating_dict,
        'data_indicators':data_indicators,
        'units':units
    }
    return render_template('module/database.html', **context)

#@login_required
@dashboard.route('/calc', methods=['GET', 'POST'])
def calc():
    data, translating_dict = app.db_object.get_distribution()
    data_indicators = app.db_object.get_indicators()
    units = app.db_object.get_units()
    context = {
        'anonymous': False,
        'user_ip': "UserIp",
        'data':data,
        'translating_dict':translating_dict,
        'data_indicators':data_indicators,
        'units':units
    }
    return render_template('module/calc.html', **context)

#@login_required
@dashboard.route('/config', methods=['GET', 'POST'])
def config():
    context = {
        'anonymous': False,
        'user_ip': "UserIp",
    }
    return render_template('module/config.html', **context)

#@login_required


@dashboard.route('/', methods=['GET', 'POST'])
def main():
    context = {
        'anonymous': False,
        'user_ip': "UserIp",
    }
    return render_template('module/main.html', **context)
