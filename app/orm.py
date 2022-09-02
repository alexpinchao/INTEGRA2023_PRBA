

from sqlalchemy import create_engine
from sqlalchemy import MetaData, Table, Column, Integer, Text, String
from sqlalchemy.sql import select

metadata_obj = MetaData()
users_table = Table('users', metadata_obj,
                    Column('id_login', Integer,
                           primary_key=True, nullable=False),
                    Column('name', String),
                    Column('organization', String)
                    )

login_table = Table('login', metadata_obj,
                    Column('idlogin', Integer,
                           primary_key=True, nullable=False, autoincrement=True),
                    Column('user', String),
                    Column('password', String)
                    )

emission_table = Table('FEmision', metadata_obj,
                    Column('año', Integer, nullable=False, unique=True),
                    Column('ECO2_CT_Carbon', String),
                    Column('ECO2_CT_Gas', String),
                    Column('ECO2_CT_Diesel', String),
                    Column('ECO2_CT_Fueloil', String),
                    Column('ECO2_CT_Kerosene', String),
                    Column('ECO2_CAyC_Bagazo', String),
                    Column('ECO2_CAyC_Carbon', String),
                    Column('ECO2_CAyC_Gas', String),
                    Column('ECO2_CAyC_Petroleo', String),
                    Column('ECO2_CAyC_Diesel', String),
                    Column('ECO2_CAyC_Gaslicuado', String),
                    Column('EmisionCO2_Total', String),
                    Column('EmisionCO2_SIN_Total', String),
                    Column('EmisionCO2_CT_Total', String),
                    Column('EmisionCO2_CAyC_Total', String),
                    Column('EmisionCO2_Carbon', String),
                    Column('EmisionesCO2_Gas', String),
                    Column('EmisionesCO2_Diesel', String),
                    Column('EmisionesCO2_Fueloil', String),
                    Column('EmisionesCO2_Petroleo', String),
                    Column('EmisionesCO2_Gaslicuado', String),
                    Column('EmisionesCO2_Bagazo', String)
                    )

consumption_table = Table('G_Consumo', metadata_obj,
                    Column('año', Integer, nullable=False, unique=True),
                    Column('C_CH_Agua_GWh',	String),
                    Column('C_CT_carbon_kTon', String),
                    Column('C_CT_Gas_Mpc', String),
                    Column('C_CT_Diesel_kBL',	String),
                    Column('C_CT_Fueloil_kBL', String),
                    Column('C_CT_kerosene_kBL', String),
                    Column('C_CE_Viento_GWh',	String),
                    Column('C_CS_Sol_GWh', String),
                    Column('C_CAyC_Bagazo_kTon', String),
                    Column('C_CAyC_Carbon_kTon', String),
                    Column('C_CAyC_Gas_Mpc', String),
                    Column('C_CAyC_Hidro_GWh', String),
                    Column('C_CAyC_Petroleo_kBL',	String),
                    Column('C_CAyC_Renovables_GWh',	String),
                    Column('C_CAyC_Diesel_kBL', String),
                    Column('C_CAyC_Gaslicuado_kBL',	String)
                    )

generation_table = Table('G_Electrica', metadata_obj,
                    Column('Año', Integer, nullable=False, unique=True),
                    Column('CH_Agua', String),
                    Column('CT_ACPM', String),
                    Column('CT_Carbon', String),
                    Column('CT_Combustoleo', String),
                    Column('CT_Gas', String),
                    Column('CT_GasNI', String),
                    Column('CT_JETA1', String),
                    Column('CT_Mezclas', String),
                    Column('CT_Querosene', String),
                    Column('CT_Bagazo', String),
                    Column('CT_Biogas', String),
                    Column('CT_Biomasa', String),
                    Column('CT_RadSol', String),
                    Column('CT_Total', String),
                    Column('CE_Viento', String),
                    Column('CS_Sol', String),
                    Column('CAyC_Bagazo', String),
                    Column('CAyC_Biomasa', String),
                    Column('CAyC_Carbon', String),
                    Column('CAyC_Gas', String),
                    Column('CAyC_SIN_Total', String),
                    Column('CAyC_NoSIN_Total', String),
                    Column('CAyC_Total', String),
                    Column('Porcentaje_CAyC_SIN', String),
                    Column('Generacion_fosiles_Total', String),
                    Column('Generacion_FNCE_Total', String),
                    Column('Generacion_SIN_Total', String),
                    Column('Generacion_Total', String)
                    )

pib_table = Table('PIB', metadata_obj,
                  Column('Año',	Integer, nullable=False, unique=True),
                  Column('PIB_Total', String),
                  Column('PIB_Agro', String),
                  Column('PIB_Agro_Cultivos', String),
                  Column('PIB_Agro_Cafe', String),
                  Column('PIB_Agro_Ganado', String),
                  Column('PIB_Agro_Madera', String),
                  Column('PIB_Agro_Pesca', String),
                  Column('PIB_Minas', String),
                  Column('PIB_Minas_Carbon', String),
                  Column('PIB_Minas_Petroleo', String),
                  Column('PIB_Minas_Metales', String),
                  Column('PIB_Minas_Canteras', String),
                  Column('PIB_Minas_Otros', String),
                  Column('PIB_Alimentos', String),
                  Column('PIB_Alimentos_Carne', String),
                  Column('PIB_Alimentos_Aceite', String),
                  Column('PIB_Alimentos_Lacteos', String),
                  Column('PIB_Alimentos_Almidon', String),
                  Column('PIB_Alimentos_Cafe', String),
                  Column('PIB_Alimentos_Azucar', String),
                  Column('PIB_Alimentos_Cacao', String),
                  Column('PIB_Alimentos_Frutas', String),
                  Column('PIB_Alimentos_Bebidas', String),
                  Column('PIB_Textiles', String),
                  Column('PIB_Textiles_Confeccion', String),
                  Column('PIB_Textiles_Cuero', String),
                  Column('PIB_Madera', String),
                  Column('PIB_Madera_Transformacion', String),
                  Column('PIB_Madera_Papel', String),
                  Column('PIB_Madera_Impresion', String),
                  Column('PIB_Quimica', String),
                  Column('PIB_Quimica_Refinacion', String),
                  Column('PIB_Quimica_Otros', String),
                  Column('PIB_Quimica_Plastico', String),
                  Column('PIB_Quimica_Minerales', String),
                  Column('PIB_Metales', String),
                  Column('PIB_Metales_Basicos', String),
                  Column('PIB_Metales_Electrico', String),
                  Column('PIB_Metales_Maquinaria', String),
                  Column('PIB_Metales_Vehiculos', String),
                  Column('PIB_Muebles', String),
                  Column('PIB_Muebles_Colchones', String),
                  Column('PIB_Muebles_Otros', String),
                  Column('PIB_Electricidad', String),
                  Column('PIB_Electricidad_GTD', String),
                  Column('PIB_Electricidad_Gas', String),
                  Column('PIB_Agua', String),
                  Column('PIB_Agua_Tratamiento', String),
                  Column('PIB_Agua_Residuales', String),
                  Column('PIB_Agua_Reciclaje', String),
                  Column('PIB_Edificaciones', String),
                  Column('PIB_Carreteras', String),
                  Column('PIB_Civil', String),
                  Column('PIB_Comercio', String),
                  Column('PIB_Comercio_Vehiculos', String),
                  Column('PIB_Comercio_Mantenimiento', String),
                  Column('PIB_Transporte', String),
                  Column('PIB_Transporte_Terrestre', String),
                  Column('PIB_Transporte_Acuatico', String),
                  Column('PIB_Transporte_Aereo', String),
                  Column('PIB_Transporte_almacenamiento', String),
                  Column('PIB_Transporte_Correo', String),
                  Column('PIB_Alojamiento', String),
                  Column('PIB_Información', String),
                  Column('PIB_Financieras', String),
                  Column('PIB_Inmobiliarias', String),
                  Column('PIB_Profesionales', String),
                  Column('PIB_Profesionales_Cientificas', String),
                  Column('PIB_Profesionales_Servicios', String),
                  Column('PIB_Administracion', String),
                  Column('PIB_Educacion', String),
                  Column('PIB_Educacion_Mercado', String),
                  Column('PIB_Educacion_NoMercado', String),
                  Column('PIB_Salud', String),
                  Column('PIB_Entretenimiento', String),
                  Column('PIB_Hogar', String),
                  Column('PIB_Industria_Total', String),
                  Column('PIB_ComercialyPublico_Total', String)
                )

pib_usd_table = Table('PIB_USD', metadata_obj,
                  Column('Año', Integer, nullable=False, unique=True),
                  Column('PIBUSD_Total', String),
                  Column('PIBUSD_Agro', String),
                  Column('PIBUSD_Agro_Cultivos', String),
                  Column('PIBUSD_Agro_Cafe', String),
                  Column('PIBUSD_Agro_Ganado', String),
                  Column('PIBUSD_Agro_Madera', String),
                  Column('PIBUSD_Agro_Pesca', String),
                  Column('PIBUSD_Minas', String),
                  Column('PIBUSD_Minas_Carbon', String),
                  Column('PIBUSD_Minas_Petroleo', String),
                  Column('PIBUSD_Minas_Metales', String),
                  Column('PIBUSD_Minas_Canteras', String),
                  Column('PIBUSD_Minas_Otros', String),
                  Column('PIBUSD_Alimentos', String),
                  Column('PIBUSD_Alimentos_Carne', String),
                  Column('PIBUSD_Alimentos_Aceite', String),
                  Column('PIBUSD_Alimentos_Lacteos', String),
                  Column('PIBUSD_Alimentos_Almidon', String),
                  Column('PIBUSD_Alimentos_Cafe', String),
                  Column('PIBUSD_Alimentos_Azucar', String),
                  Column('PIBUSD_Alimentos_Cacao', String),
                  Column('PIBUSD_Alimentos_Frutas', String),
                  Column('PIBUSD_Alimentos_Bebidas', String),
                  Column('PIBUSD_Textiles', String),
                  Column('PIBUSD_Textiles_Confeccion', String),
                  Column('PIBUSD_Textiles_Cuero', String),
                  Column('PIBUSD_Madera', String),
                  Column('PIBUSD_Madera_Transformacion', String),
                  Column('PIBUSD_Madera_Papel', String),
                  Column('PIBUSD_Madera_Impresion', String),
                  Column('PIBUSD_Quimica', String),
                  Column('PIBUSD_Quimica_Refinacion', String),
                  Column('PIBUSD_Quimica_Otros', String),
                  Column('PIBUSD_Quimica_Plastico', String),
                  Column('PIBUSD_Quimica_Minerales', String),
                  Column('PIBUSD_Metales', String),
                  Column('PIBUSD_Metales_Basicos', String),
                  Column('PIBUSD_Metales_Electrico', String),
                  Column('PIBUSD_Metales_Maquinaria', String),
                  Column('PIBUSD_Metales_Vehiculos', String),
                  Column('PIBUSD_Muebles', String),
                  Column('PIBUSD_Muebles_Colchones', String),
                  Column('PIBUSD_Muebles_Otros', String),
                  Column('PIBUSD_Electricidad', String),
                  Column('PIBUSD_Electricidad_GTD', String),
                  Column('PIBUSD_Electricidad_Gas', String),
                  Column('PIBUSD_Agua', String),
                  Column('PIBUSD_Agua_Tratamiento', String),
                  Column('PIBUSD_Agua_Residuales', String),
                  Column('PIBUSD_Agua_Reciclaje', String),
                  Column('PIBUSD_Edificaciones', String),
                  Column('PIBUSD_Carreteras', String),
                  Column('PIBUSD_Civil', String),
                  Column('PIBUSD_Comercio', String),
                  Column('PIBUSD_Comercio_Vehiculos', String),
                  Column('PIBUSD_Comercio_Mantenimiento', String),
                  Column('PIBUSD_Transporte', String),
                  Column('PIBUSD_Transporte_Terrestre', String),
                  Column('PIBUSD_Transporte_Acuatico', String),
                  Column('PIBUSD_Transporte_Aereo', String),
                  Column('PIBUSD_Transporte_almacenamiento', String),
                  Column('PIBUSD_Transporte_Correo', String),
                  Column('PIBUSD_Alojamiento', String),
                  Column('PIBUSD_Información', String),
                  Column('PIBUSD_Financieras', String),
                  Column('PIBUSD_Inmobiliarias', String),
                  Column('PIBUSD_Profesionales', String),
                  Column('PIBUSD_Profesionales_Cientificas', String),
                  Column('PIBUSD_Profesionales_Servicios', String),
                  Column('PIBUSD_Administracion', String),
                  Column('PIBUSD_Educacion', String),
                  Column('PIBUSD_Educacion_Mercado', String),
                  Column('PIBUSD_Educacion_NoMercado', String),
                  Column('PIBUSD_Salud', String),
                  Column('PIBUSD_Entretenimiento', String),
                  Column('PIBUSD_Hogar', String),
                  Column('PIBUSD_Industria_Total', String),
                  Column('PIBUSD_ComercialyPublico_Total', String)
                  )

population_table = Table('Poblacion', metadata_obj,
                  Column('Año', Integer, nullable=False, unique=True),
                  Column('P_Urbano', String),
                  Column('P_Rural', String),
                  Column('Poblacion_Total', String)
                  )

end_use_energy_table = Table('U_Energia', metadata_obj,
                  Column('Año', Integer, nullable=False, unique=True),
                  Column('C_Residencial_U', String),
                  Column('C_Residencia_R', String),
                  Column('C_Residencial_Total', String),
                  Column('C_CyP_Total', String),
                  Column('C_Ind_Alimentos', String),
                  Column('C_Ind_Bebidas', String),
                  Column('C_Ind_Tabaco', String),
                  Column('C_Ind_Textil', String),
                  Column('C_Ind_Vestimenta', String),
                  Column('C_Ind_Marroquineria', String),
                  Column('C_Ind_Madera', String),
                  Column('C_Ind_Papel', String),
                  Column('C_Ind_Impresion', String),
                  Column('C_Ind_Refinerias', String),
                  Column('C_Ind_Quimicos', String),
                  Column('C_Ind_Farmaceuticos', String),
                  Column('C_Ind_Plastico', String),
                  Column('C_Ind_Minerales', String),
                  Column('C_Ind_Metalurgia', String),
                  Column('C_Ind_Metal', String),
                  Column('C_Ind_Electronico', String),
                  Column('C_Ind_Electrico', String),
                  Column('C_Ind_Maquinaria', String),
                  Column('C_Ind_Vehiculos', String),
                  Column('C_Ind_Transporte', String),
                  Column('C_Ind_Muebles', String),
                  Column('C_Ind_Manufactura', String),
                  Column('C_Ind_Agropecuario', String),
                  Column('C_Ind_Mineria', String),
                  Column('C_Ind_Desconocido', String),
                  Column('C_Industrial_Total', String),
                  Column('ConsumoFinal_Total', String)
                  )

households_table = Table('Viviendas', metadata_obj,
                  Column('Año', Integer, nullable=False, unique=True),
                  Column('V_Urbano', String),
                  Column('V_Rural', String),
                  Column('Vivienda_Total', String)
                  )

loss_table = Table('D_Perdidas', metadata_obj,
                     Column('Año', Integer, nullable=False, unique=True),
                     Column('NT1', String),
                     Column('NT2', String),
                     Column('NT3', String),
                     Column('Total', String)
                     )

loss_cost_table = Table('D_Costos_Perdidas', metadata_obj,
                     Column('Año', Integer, nullable=False, unique=True),
                     Column('NT1', String),
                     Column('NT2', String),
                     Column('NT3', String),
                     Column('Total', String)
                     )

equivalent_losses_table = Table('D_Perdidas_Equivalentes', metadata_obj,
                     Column('Año', Integer, nullable=False, unique=True),
                     Column('NT1', String),
                     Column('NT2', String),
                     Column('NT3', String),
                     Column('Total', String)
                     )

iaad_table = Table('D_IAAD', metadata_obj,
                     Column('Año', Integer,
                            nullable=False, unique=True),
                     Column('NT1', String),
                     Column('NT2_NT3', String),
                     Column('Total', String)
                     )

""" engine = create_engine('sqlite:///sqlite/NewDB.db')
connetion = engine.connect() """
#result = engine.execute("select * from users")
""" result = engine.execute(emission_table.select())
for row in result:
    print(row)
result.close() """


#### Insert ####
""" ins = users_table.insert().values(id_login='1', name='Jack Jones', organization='Univalle')
result = engine.execute(ins) """
#### Select ####
""" sel = select(iaad_table)
result = engine.execute(sel)
columns = [col for col in result.keys()]
rows = [dict(zip(columns, row)) for row in result.fetchall()]
print(rows) """

def solution(a):
       count = 0
       for i in range(0,len(a)):
              if i==0:
                     a0 = 0
              else:
                     a0 = a[i-1]
              if i==len(a)-1:
                     a1 = 0
              else:
                     a1 = a[i+1]
              if ((a0+a1)/2==a[i]):
                     count +=1
       return count

a = [2, 4, 6, 6, 3]
print(solution(a))
