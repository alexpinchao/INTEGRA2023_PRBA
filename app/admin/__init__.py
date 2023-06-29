from flask import request, redirect, url_for
from flask_login import current_user
from flask_admin.contrib.sqla import ModelView


class AdminModelView(ModelView):
    can_delete = False
    create_modal = True
    edit_modal = True

    def is_accessible(self):
        return current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('login', next=request.url))
