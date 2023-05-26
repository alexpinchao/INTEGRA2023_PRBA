from flask import (
    render_template,
    redirect,
    flash,
    url_for,
    session,
    request,
    current_app as app,
)
from . import dashboard
from app.extras import return_indicators_calculation
from app.models import UserData, UserModel
from flask_login import login_required, login_user, logout_user
import json
import pandas as pd
import numpy as np

from scikitmcda.topsis import TOPSIS
from scikitmcda.constants import MAX, MIN, LinearMinMax_, LinearMax_, LinearSum_, Vector_, EnhancedAccuracy_, Logarithmic_ 

# ONLY TEST
value = 60

strategies_definition = {
    "generation": {
        "process": "Generación",
        "models": [
            {
                "id": "d001",
                "name": "Estrategias de expansión",
                "strategies": [
                    {
                        "id": "x001",
                        "name": "Generación eléctrica a partir de parque térmico",
                        "description": "N/A",
                        "variable": "Capacidad Instalada",
                        "upper_value": 10,
                        "lower_value": 0,
                        "value": 6,
                        "year": 2025,
                        "unit": "GW",
                        "fp": 35.2576182447618/100,
                        "id_relation":"r001",
                    },
                    {
                        "id": "x002",
                        "name": "Generación eléctrica a partir de plantas hidráulicas",
                        "description": "N/A",
                        "variable": "Capacidad Instalada",
                        "upper_value": 100,
                        "lower_value": 0,
                        "value": 15,
                        "year": 2025,
                        "unit": "GW",
                        "fp": 51.4937014/100,
                        "id_relation":"r002",
                    },
                    {
                        "id": "x003",
                        "name": "Generación eléctrica a partir de plantas de Auto y Cogeneración",
                        "description": "N/A",
                        "variable": "Capacidad Instalada",
                        "upper_value": 10,
                        "lower_value": 0,
                        "value": 2,
                        "year": 2025,
                        "unit": "GW",
                        "fp":91.3033263/100,
                        "id_relation":"r003",
                    },
                    {
                        "id": "x004",
                        "name": "Generación eléctrica a partir de plantas eólicas",
                        "description": "N/A",
                        "variable": "Capacidad Instalada",
                        "upper_value": 10,
                        "lower_value": 1,
                        "value": 3,
                        "year": 2025,
                        "unit": "GW",
                        "fp": 34.7849019/100,
                        "id_relation":"r004",
                    },
                    {
                        "id": "x005",
                        "name": "Generación eléctrica a partir de plantas solares",
                        "description": "N/A",
                        "variable": "Capacidad Instalada",
                        "upper_value": 10,
                        "lower_value": 1,
                        "value": 1,
                        "year": 2025,
                        "unit": "GW",
                        "fp": 36.8224441/100,
                        "id_relation":"r005",
                    },
                ],
            },
            {
                "id": "d002",
                "name": "Estrategias de actualización",
                "strategies": [
                    {
                        "id": "y001",
                        "name": "Mejoras de eficiencia en parque térmico",
                        "description": "N/A",
                        "variable": "PI",
                        "upper_value": 100,
                        "lower_value": 0,
                        "value": 56,
                        "year": 2025,
                        "unit": "%",
                        "n_LB": 37.1999989362893 / 100,
                        "values_BAU": [17730.94, 19359.14, 19359.14, 19359.14, 19359.14, 19359.14, 19359.14, 19359.14, 19359.14],
                        "id_relation":"r001",
                    },
                    {
                        "id": "y002",
                        "name": "Mejoras de eficiencia en plantas hidráulicas",
                        "description": "N/A",
                        "variable": "PI",
                        "upper_value": 100,
                        "lower_value": 0,
                        "value": 90,
                        "year": 2025,
                        "unit": "%",
                        "n_LB": 88.0834783514384 / 100,
                        "values_BAU": [53881.14, 58641.03, 67662.72, 67662.72, 67662.72, 67662.72, 67662.72, 67662.72, 67662.72],
                        "id_relation":"r002",
                    },
                    {
                        "id": "y003",
                        "name": "Mejoras de eficiencia en plantas de Auto y Cogeneración",
                        "description": "N/A",
                        "variable": "PI",
                        "upper_value": 100,
                        "lower_value": 0,
                        "value": 47,
                        "year": 2025,
                        "unit": "%",
                        "n_LB": 36.3372271796145 / 100,
                        "values_BAU": [10629.57, 10885.51, 11165.45, 11429.39, 11733.32, 12013.25, 12317.18, 12613.12, 12909.05],
                        "id_relation":"r003",
                    },
                    {
                        "id": "y004",
                        "name": "Mejoras de eficiencia en plantas eólicas",
                        "description": "N/A",
                        "variable": "PI",
                        "upper_value": 100,
                        "lower_value": 0,
                        "value": 55,
                        "year": 2025,
                        "unit": "%",
                        "n_LB": 53.725/ 100,
                        "values_BAU": [56.13, 6094.31, 6094.31, 6094.31, 6094.31, 6094.31, 9141.47, 9141.47, 9141.47],
                        "id_relation":"r004",
                    },
                    {
                        "id": "y005",
                        "name": "Mejoras de eficiencia en plantas solares",
                        "description": "N/A",
                        "variable": "PI",
                        "upper_value": 100,
                        "lower_value": 0,
                        "value": 22,
                        "year": 2025,
                        "unit": "%",
                        "n_LB": 20.8268 / 100,
                        "values_BAU": [935.81, 3225.65, 3225.65, 3225.65, 3225.65, 3225.65, 3225.65, 3225.65, 3225.65],
                        "id_relation":"r005",
                    },
                ],
            },
        ],
    },
    "distribution": {
        "process": "Distribución",
        "models": [
            {
                "id": "NA",
                "name": "NA",
                "strategies": [
                    {
                        "id": "NA",
                        "name": "NA",
                        "description": "N/A",
                        "variable": "NA",
                        "upper_value": 0,
                        "lower_value": 0,
                        "value": 0,
                        "year": 0,
                        "unit": "%",
                    }
                ],
            }
        ],
    },
    "end_use": {
        "process": "Uso final",
        "models": [
            {
                "id": "NA",
                "name": "NA",
                "strategies": [
                    {
                        "id": "NA",
                        "name": "NA",
                        "description": "N/A",
                        "variable": "NA",
                        "upper_value": 0,
                        "lower_value": 0,
                        "value": 0,
                        "year": 0,
                        "unit": "%",
                    }
                ],
            }
        ],
    },
}

def functionTopsis(output,weiths):
    topsis = TOPSIS()
    # topsis.dataframe([[0.898834783514384, 0.166638958655125, 0.0],[0.403999992022169, 0.106074659601237, 13.4056094057448],[0.473372271796145, 0.0603668284274698, 7.6290994098352],[0.55725, 0.0363139093316429, 0.0],[0.223268, 0.031981378104915,  0.0]],['P Hidro', 'P Termicas', 'P A&C', 'P Eolicas', 'P Solares'],['EFICIENCIA', 'IEP', 'IEC']
    #                 )
    topsis.dataframe(output[0],output[1],output[2])
    print(topsis.pretty_original())
    w_TOPSIS = topsis.set_weights_manually(weiths[0])
    topsis.set_signals([MAX, MIN, MIN])
    topsis.decide()
    df_topsis = topsis.df_decision
    rank_alternatives = df_topsis.to_json(force_ascii=False, orient='records')
    return rank_alternatives

# @login_required
@dashboard.route("/analysis", methods=["GET", "POST"])
def analysis():
    admin_session = session.get("admin_session")
    if request.method == "POST":
        output = request.get_json()
        # This is the output that was stored in the JSON within the browser
        result = json.loads(output) #this converts the json output to a python dictionary
        data_result = result.get('data_topsis')
        values = []
        name = []
        weiths= []
        dataframe = []
        for row in data_result:
            keys = row.keys()
            if ([*row.keys()][0] == 'criteria_values'):
                row_values = row.values()
                for row_val in row_values:
                    for val in row_val:
                        number = [*val.values()]
                        weiths.append(number)
            else:
                name.extend(keys)
                row_values = row.values()
                for row_val in row_values:
                    for val in row_val:
                        number = [*val.values()]
                        values.append(number)
        criterios_name = ['EFICIENCIA', 'IEP', 'IEC']
        dataframe.append(values)
        dataframe.append(name)
        dataframe.append(criterios_name)
        topsis = functionTopsis(dataframe, weiths)
        return topsis
    else:
        strategies = app.db_object.get_Strategies()
        description_strategies = app.db_object.get_description_Strategies()
        data, translating_dict = app.db_object.get_distribution()
        units = app.db_object.get_units()
        context = {
            "anonymous": False,
            "user_ip": "UserIp",
            "data": data,
            "strategies": strategies,
            "strategies_definition": strategies_definition,
            "description_strategies": description_strategies,
            "units": units,
            "translating_dict": translating_dict,
            "admin_session": admin_session,
        }
        return render_template("module/analysis.html", **context)


# @login_required
@dashboard.route("/database", methods=["GET", "POST"])
def database():
    admin_session = session.get("admin_session")
    data, translating_dict = app.db_object.get_distribution()
    data_indicators = app.db_object.get_indicators()
    units = app.db_object.get_units()

    dict_total_indicadores = return_indicators_calculation()
    print("------------entra a database-------")
    # print(data)
    # print(data)
    """     json_data = json.dumps(data, ensure_ascii=False)
    print(json_data)
    print(type(json_data)) """
    context = {
        "anonymous": False,
        "user": "UserIp",
        "data": data,
        "data_total_indicators": dict_total_indicadores,
        "translating_dict": translating_dict,
        "data_indicators": data_indicators,
        "units": units,
        "admin_session": admin_session,
    }
    return render_template("module/database.html", **context)


# @login_required
@dashboard.route("/calc", methods=["GET", "POST"])
def calc():
    data, translating_dict = app.db_object.get_distribution()
    data_indicators = app.db_object.get_indicators()
    data_projections = app.db_object.get_projections()
    units = app.db_object.get_units()

    dict_total_indicadores = return_indicators_calculation()
    context = {
        "anonymous": False,
        "user": "UserIp",
        "data": data,
        "data_total_indicators": dict_total_indicadores,
        "translating_dict": translating_dict,
        "data_indicators": data_indicators,
        "data_projections": data_projections,
        "units": units,
        "admin_session": session.get("admin_session"),
    }
    return render_template("module/calc.html", **context)


# @login_required
@dashboard.route("/config", methods=["GET", "POST"])
def config():
    context = {
        "anonymous": False,
        "user": "UserIp",
    }
    return render_template("module/config.html", **context)


# @login_required
@dashboard.route("/", methods=["GET", "POST"])
def main():
    admin_user = (False, True)[
        (session.get("username") == "mateo.barrera@correounivalle.edu.co")
    ]
    admin_session = session.get("admin_session")
    if request.method == "POST":
        admin_session = eval(request.form["admin-session"])
        session["admin_session"] = admin_session

    text_module_db = "En el módulo de base de datos se recopila información de las variables e indicadores de eficiencia energética asociados a los procesos de generación, distribución y uso final de la energía eléctrica en Colombia."
    text_module_calc = "En el módulo de escenario base "
    text_module_anl = "En el módulo de escenario base ...."
    text_module_conf = "En el apartado de Configuración se puede acceder a la información del usuario y ajustes referentes a las credenciales empleadas en el acceso a la herramienta."

    context = {
        "anonymous": False,
        "user": "UserIp",
        "admin_session": admin_session,
        "admin_user": admin_user,
        "text_module_db": text_module_db,
        "text_module_calc": text_module_calc,
        "text_module_anl": text_module_anl,
        "text_module_conf": text_module_conf,
    }

    return render_template("module/main.html", **context)
