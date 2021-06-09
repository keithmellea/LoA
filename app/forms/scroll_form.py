from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired

class ScrollForm(FlaskForm):
    author = StringField('author', validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    published = StringField('published', validators=[DataRequired()])
    body = TextField("body", validators=[DataRequired()])