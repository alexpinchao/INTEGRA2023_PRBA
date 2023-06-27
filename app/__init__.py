"""INTEGRA 2023 Platform Server Initialization file

this file allows to import all the dependencies for the platform initialization.
"""
from flask.app import Flask
from .config import Config
from .auth import auth
from .dashboard import dashboard
from flask_login import LoginManager
from flask_mail import Mail
from .models import UserModel
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from flask_compress import Compress
from flask_sitemap import Sitemap
from flask_minify import Minify

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
ext = Sitemap()
mail = Mail()
db = SQLAlchemy()


@login_manager.user_loader
def load_user(username):
    """Handler for flask server implementation of loginManager.

    Args:
        username (str): user identification for the session within the platform.

    Returns:
        UserModel: Information model for the user session
    """
    return UserModel.query(username)


def create_app():
    """App implementation
    'Constructor' of the flask app type object and its initialization.

    Returns:
        app: flask server instance
    """
    app = Flask(__name__)
    Compress(app)
    Minify(app=app, html=True, js=True, cssless=True)

    app.config.from_object(Config)
    login_manager.init_app(app)
    db.init_app(app)
    with app.app_context():
        # Configuración de automap
        Base = automap_base()
        Base.prepare(db.engine, reflect=True)

        # Obtener las clases mapeadas automáticamente
        User = Base.classes.users
    ext.init_app(app)
    mail.init_app(app)

    app.register_blueprint(auth)
    app.register_blueprint(dashboard)
    admin = Admin(app, name='microblog', template_mode='bootstrap3')

    return app
