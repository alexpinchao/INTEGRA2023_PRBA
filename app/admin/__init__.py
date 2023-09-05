import os.path as op
from flask import request, redirect, url_for
from flask_login import current_user
from flask_admin import AdminIndexView
from flask_admin import helpers, expose
from flask_admin.contrib.sqla import ModelView
from flask_admin.contrib.fileadmin import FileAdmin
from flask_admin.form.upload import FileUploadField
from wtforms.validators import ValidationError


class UserModelView(ModelView):
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


class DataModelView(ModelView):
    @staticmethod
    def file_validation(form, field):
        try:
            print(request.path.split("/")[2])
        except:
            pass
        if field.data:
            filename = field.data.filename
            print(filename)
            """if filename[-4:] != '.csv':
               p
        field.data = field.data.stream.read()"""
        return True

    def __init__(self, model, *args, **kwargs):
        path = op.join(op.dirname(__file__), 'data')
        print("Se ejecuta al menos")
        self.can_export = True
        self.export_types = ['csv', 'xlsx']

        self.form_extra_fields = {
            'file': FileUploadField('file', base_path=path, validators=[self.file_validation])
        }
        self.form_overrides = dict(file=FileUploadField('file', base_path=path, validators=[self.file_validation]))
        self.form_args = {
            'file': {
                'label': 'File',
                'base_path': path,
                'allow_overwrite': False,
                'validators': [self.file_validation]
            }
        }
        super(DataModelView, self).__init__(model, *args, **kwargs)





class MyFileAdminView(FileAdmin):
    can_delete = False
