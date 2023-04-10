from flask import render_template, redirect, flash, url_for, session, request, current_app as app
from . import dashboard
from app.extras import return_indicators_calculation
from app.models import UserData, UserModel
from flask_login import login_required, login_user, logout_user
import json

#@login_required
@dashboard.route('/analysis', methods=['GET', 'POST'])
def analysis():
    admin_session = session.get('admin_session')
    # translating_dict = app.db_object.get_distribution()
    strategies = app.db_object.get_Strategies()
    description_strategies = app.db_object.get_description_Strategies()
    data, translating_dict = app.db_object.get_distribution()
    units = app.db_object.get_units()
    context = {
        'anonymous': False,
        'user_ip': "UserIp",
        'data':data,
        'strategies':strategies,
        'description_strategies':description_strategies,
        'units':units,
        'translating_dict':translating_dict,
        'admin_session':admin_session,
    }
    return render_template('module/analysis.html', **context)

#@login_required
@dashboard.route('/database', methods=['GET', 'POST'])
def database():
    admin_session = session.get('admin_session')
    data, translating_dict = app.db_object.get_distribution()
    data_indicators = app.db_object.get_indicators()
    units = app.db_object.get_units()
    
    dict_total_indicadores = return_indicators_calculation()
    print("------------entra a database-------")
    # print(data)
    #print(data)
    """     json_data = json.dumps(data, ensure_ascii=False)
    print(json_data)
    print(type(json_data)) """
    context = {
        'anonymous': False,
        'user': "UserIp",
        'data':data,
        'data_total_indicators':dict_total_indicadores,
        'translating_dict':translating_dict,
        'data_indicators':data_indicators,
        'units':units,
        'admin_session': admin_session,
    }
    return render_template('module/database.html', **context)

#@login_required
@dashboard.route('/calc', methods=['GET', 'POST'])
def calc():
    data, translating_dict = app.db_object.get_distribution()
    data_indicators = app.db_object.get_indicators()
    data_projections = app.db_object.get_projections()
    units = app.db_object.get_units()

    dict_total_indicadores = return_indicators_calculation()
    context = {
        'anonymous': False,
        'user': "UserIp",
        'data':data,
        'data_total_indicators':dict_total_indicadores,
        'translating_dict':translating_dict,
        'data_indicators':data_indicators,
        'data_projections':data_projections,
        'units':units,
        'admin_session':session.get('admin_session'),
    }
    return render_template('module/calc.html', **context)

#@login_required
@dashboard.route('/config', methods=['GET', 'POST'])
def config():
    context = {
        'anonymous': False,
        'user': "UserIp",
    }
    return render_template('module/config.html', **context)

#@login_required
@dashboard.route('/', methods=['GET', 'POST'])
def main():
    admin_user = (False, True)[(session.get('username') == 'mateo.barrera@correounivalle.edu.co')]
    admin_session = session.get('admin_session')
    if request.method == 'POST':
        admin_session = eval(request.form['admin-session'])
        session['admin_session'] = admin_session
        
    text_module_db = 'En el módulo de base de datos se recopila información de las variables e indicadores de eficiencia energética asociados a los procesos de generación, distribución y uso final de la energía eléctrica en Colombia.'
    text_module_calc = 'En el módulo de escenario base '
    text_module_anl = 'En el módulo de escenario base ....'
    text_module_conf = 'En el apartado de Configuración se puede acceder a la información del usuario y ajustes referentes a las credenciales empleadas en el acceso a la herramienta.'

    context = {
        'anonymous': False,
        'user': 'UserIp',
        'admin_session': admin_session,
        'admin_user':admin_user,
        'text_module_db': text_module_db,
        'text_module_calc': text_module_calc,
        'text_module_anl': text_module_anl,
        'text_module_conf': text_module_conf,
    }

    return render_template('module/main.html', **context)
