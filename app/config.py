"""INTEGRA 2023 Platform Server Config parameters file

this file configures parameters used by the server.
"""
class Config:
  """Flask server Setup parameters
  """  
  #Session Cookie    
  SECRET_KEY = 'SUPER SECRET'
  ##OLD Dstabase config##
  MYSQL_DATABASE_HOST = 'localhost'
  MYSQL_DATABASE_USER = 'root'
  MYSQL_DATABASE_PASSWORD = ''
  MYSQL_DATABASE_DB = 'DB_EXAMPLE'
  ##SQLAlchemy config##
  SQLALCHEMY_DATABASE_URI = 'sqlite://app/sqlite/NewDB.db'
  SQLALCHEMY_TRACK_MODIFICATIONS = False


