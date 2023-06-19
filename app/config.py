"""INTEGRA 2023 Platform Server Config parameters file

this file contains the configures parameters used by the server.
"""


class Config:
    """Flask server Setup parameters
    """
    # Session Cookie
    SECRET_KEY = 'SUPER SECRET'
    # SQLAlchemy config
    SQLALCHEMY_DATABASE_URI = 'sqlite://app/sqlite/NewDB.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SITEMAP_INCLUDE_RULES_WITHOUT_PARAMS = True
