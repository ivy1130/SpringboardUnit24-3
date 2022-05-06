from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, URL, Optional

class AddCupcakeForm(FlaskForm):
    """Form for adding cupcakes."""

    flavor = StringField('Flavor', validators=[InputRequired()])
    size = StringField('Size', validators=[InputRequired()])
    rating = FloatField('Rating', validators=[InputRequired()])
    image = StringField('Image', validators=[Optional(), URL(message='Please enter a valid photo url.')])