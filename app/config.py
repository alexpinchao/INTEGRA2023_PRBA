"""INTEGRA 2023 Platform Server Config parameters file

this file contains the configures parameters used by the server.
"""
from datetime import timedelta


class Config:
    """Flask server Setup parameters
    """
    # Session Cookie
    SECRET_KEY = 'SUPER SECRET'
    # SQLAlchemy config
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app/sqlite/NewDB.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SITEMAP_INCLUDE_RULES_WITHOUT_PARAMS = True

    # MAIL CONFIG
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'web.noreply.app@gmail.com'
    MAIL_ADMIN = 'mateo.barrera@correounivalle.edu.co'
    MAIL_DEFAULT_SENDER = 'INTEGRA'
    MAIL_PASSWORD = 'schemiuyrgvxzdhm'

    # ADMIN
    FLASK_ADMIN_SWATCH = 'cerulean'
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=20)
