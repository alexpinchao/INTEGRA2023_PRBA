from flask import request, redirect, url_for
from flask_login import current_user
from flask_admin import AdminIndexView
from flask_admin import helpers, expose
from flask_admin.contrib.sqla import ModelView


class ModelView(ModelView):
    can_delete = False
    create_modal = True
    page_size = 10

    def is_accessible(self):
        return current_user.is_authenticated


class MyAdminIndexView(AdminIndexView):

    @expose('/')
    def index(self):
        if not current_user.is_authenticated:
            return redirect(url_for('auth.login'))
        return super(MyAdminIndexView, self).index()
