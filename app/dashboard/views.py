from tokenize import Double
from unittest import case
from flask import render_template, redirect, flash, url_for, session, request, current_app as app
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
    admin_session = session.get('admin_session')
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
        'user': "UserIp",
        'data':data,
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
    units = app.db_object.get_units()

    array_default = []
    array_default1 = [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000]
    array_default.append(array_default1)
    array_default.append(array_default1)

    data_generation_total_generation = data["generation"]["Generación por fuente primaria"]
    data_generation_consumo = data["generation"]["Consumo eléctrico por fuente generación"]
    data_generation_emisiones_total = data["generation"]["Emisiones CO2 equivalentes"]
    data_generation_emisiones_SIN = data["generation"]["Emisiones CO2 equivalentes"]

    data_distribution_factor_perdidas = data["distribution"]["Factor de Pérdidas"]
    data_distribution_costo_perdidas = data["distribution"]["Costo de Pérdidas"]
    data_distribution_iaad = data["distribution"]["IAAD"]
    
    data_end_use_pib = data["end_use"]["PIB en USD"]
    data_end_use_population = data["end_use"]["Población"]
    data_end_use_total_consumption = data["end_use"]["Uso final de la energía"]

    # function
    # function that returns a dictionary with year and the variable of interest for the calculation of the indicator
    # @params: loop_data : array table
    # @params: variable : name of variable of interest to search
    # return: anio,varible_return
    def loopData(loop_data, variable):
        anio = []
        varible_return = []
        for n in loop_data:
            anio.append(n["Año"])
            if(len(varible_return)<11):
                x = n[variable].replace(",", ".")
                y = float(x)
                varible_return.append(y)
        return anio,varible_return

    # function
    # function that returns a dictionary with year and calculation of the value of the indicator
    # @params: data_input_1 : array variable one
    # @params: data_input_2 : array variable two
    # @params: nombre : dictionary key name
    # @params: tipo : type of operation
    # return: salida
    def prepareData(data_input_1, data_input_2, nombre, tipo):
        input_1 = data_input_1[1]
        anio_input_1 = data_input_1[0]
        input_2 = data_input_2[1]
        anio_input_2 = data_input_2[0]
        if (len(input_1) == len(input_2)):
            j = len(input_1)
            i =0
            salida = []
            while i < j:
                salida_dict ={}
                if (tipo == "1"):
                    salida_dict.update({"Año": anio_input_1[i], nombre:(input_1[i]/input_2[i])*1000})
                    salida.append(salida_dict)
                elif(tipo == "2"):
                    salida_dict.update({"Año": anio_input_1[i], nombre:(input_1[i]/input_2[i])/1000})
                    salida.append(salida_dict)
                elif(tipo == "3"):
                    salida_dict.update({"Año": anio_input_1[i], nombre:input_1[i]/input_2[i]})
                    salida.append(salida_dict)
                i +=1
        return salida
    
    # function
    # function that returns a dictionary with year and total of the input array
    # @params: data_input_1
    # return: variable_return
    def prepareDataTwo(data_input_1):
        varible_return = []
        for n in data_input_1:
            if(len(varible_return)<11):
                salida_dict ={}
                salida_dict.update({"Año": n["Año"], "Total":n["Total"]})
                varible_return.append(salida_dict)
        return varible_return

    generation_total_generation = loopData(data_generation_total_generation,"Generacion_Total")
    generation_consumo = loopData(data_generation_consumo,"Total_Consumo_generacion_GWh")
    generation_emisiones_total = loopData(data_generation_emisiones_total,"EmisionCO2_Total")
    generation_emisiones_SIN = loopData(data_generation_emisiones_SIN,"EmisionCO2_SIN_Total")

    end_use_pib = loopData(data_end_use_pib, "PIBUSD_Total")
    end_use_population = loopData(data_end_use_population, "Poblacion_Total")
    end_use_total_consumption = loopData(data_end_use_total_consumption, "ConsumoFinal_Total")

    #carga de indicadores en la generacion
    eficienc_gen_electrica = prepareData(generation_total_generation, generation_consumo, "Eficiencia de la generacion electrica" , "1" )
    intens_energ_gen = prepareData(generation_consumo, end_use_pib,"Intensidad energetica generacion electrica", "2")
    inten_emision_gen_electrica = prepareData(generation_emisiones_SIN, end_use_pib,"Intensidad de emision generacion electrica", "3")
    emisiones_co2_sin_total = prepareData(generation_emisiones_SIN, array_default,"Emisiones CO2 SIN total", "3")
    emisiones_co2_total = prepareData(generation_emisiones_total, array_default,"Emisiones CO2 total", "3")

    dict_generacion = {}
    dict_generacion.update({"Eficiencia de la generacion electrica":eficienc_gen_electrica})
    dict_generacion.update({"Intensidad energetica generacion electrica" :intens_energ_gen})
    dict_generacion.update({"Intensidad de emision generacion electrica":inten_emision_gen_electrica})
    dict_generacion.update({"Emisiones Co2 SIN total":emisiones_co2_sin_total})
    dict_generacion.update({"Emisiones Co2 SIN total":emisiones_co2_total})

    #carga de indicadores en la generacion
    distribution_factor_perdida = prepareDataTwo(data_distribution_factor_perdidas)
    distribution_costo_perdidas = prepareDataTwo(data_distribution_costo_perdidas)
    distribution_iaad  = prepareDataTwo(data_distribution_iaad)

    dict_distribuciones = {}
    dict_distribuciones.update({"Factor de pedidas en distribucion":distribution_factor_perdida})
    dict_distribuciones.update({"Costo de perdidad equivalentes en la distribucion" :distribution_costo_perdidas})
    dict_distribuciones.update({"Indice anual aumulado de discontinuidad":distribution_iaad})

    #carga de indicadores en la uso final
    consumo_per_capita = prepareData(end_use_total_consumption, end_use_population,"Consumo per capita" ,"1")
    int_ener_uso_final = prepareData(end_use_total_consumption, end_use_pib, "Intensidad energetica uso final", "2")

    dict_uso_final = {}
    dict_uso_final.update({"Consumo per capita":consumo_per_capita})
    dict_uso_final.update({"Intensidad energetica uso final":int_ener_uso_final})

    dict_total_indicadores = {}
    dict_total_indicadores.update({"generation":dict_generacion })
    dict_total_indicadores.update({"distribution":dict_distribuciones })
    dict_total_indicadores.update({"end_use":dict_uso_final })
    # print(dict_total_indicadores)

    context = {
        'anonymous': False,
        'user': "UserIp",
        'data':data,
        'data_total_indicators':dict_total_indicadores,
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
        'user': "UserIp",
    }
    return render_template('module/config.html', **context)

#@login_required
@dashboard.route('/', methods=['GET', 'POST'])
def main():
    admin_user = True
    admin_session = session.get('admin_session')
    if request.method == 'POST':
        admin_session = eval(request.form['admin-session'])
        session['admin_session'] = admin_session

    context = {
        'anonymous': False,
        'user': 'UserIp',
        'admin_session': admin_session,
        'admin_user':admin_user,
    }

    return render_template('module/main.html', **context)
