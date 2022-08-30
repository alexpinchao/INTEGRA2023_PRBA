"""INTEGRA 2023 Platform Server Models File

This file is part of the INTEGRA 2023 platform flask server.
It integrates the data model for the User's session information required for the server built-in login.

@Author: Mateo Barrera

@Date: 12-07-2022
"""

from flask_login import UserMixin
from flask import current_app as app

class UserData:
  """User information class
  Management information for the user's session on the server.
  """  
  """   def __init__(self, username, password):
    self.username = username
    self.password = password """

  def __init__(self, username, password, data=None):
    self.username = username
    self.password = password
    if data:
      self.name = data['name']
      self.organization = data['organization']

class UserModel(UserMixin):
  """UserModel class
  Manages the information inside the session for the user.
  Args:
      UserMixin (Flask UserMixin Object): Extend the flask object for manage of the user's session.
  """  
  def __init__(self, user_data):
    """
    Constructor for UserModel class
    Args:
        user_data (UserData object): User information.
    """
    self.id = user_data.username
    self.password = user_data.password

  @staticmethod
  def query(user_id):
    """ 
    Generate the factory funtion for session validation query
    Args:
        user_id (str): id key from user data on database User Table.

    Returns:
        User info: UserModel class instance for the log user.
    """    
    user_doc = app.db_object.get_user(user_id)
    if user_doc:
      user_doc = user_doc[0]
      user_data_db = app.db_object.get_user_data(user_doc['idlogin'])
      user_data = UserData(username=user_doc['idlogin'],password=user_doc['password'], data=user_data_db[0])
      #user_data = UserData(user_data)
      return UserModel(user_data)
    else:
      return None
    
