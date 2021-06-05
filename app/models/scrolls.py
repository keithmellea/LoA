from .db import db

class Scroll(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(30), nullable=False)
    title = db.Column(db.String(50), nullable=False, unique = True)
    published = db.Column(db.DateTime, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
        "id": self.id,
        "author": self.author,
        "title": self.title,
        "published": self.published,
        "body": self.body,
        "created_on": self.created_on,
        "updated_on": self.updated_on,
       }