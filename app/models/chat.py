from .db import db

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


    def to_dict(self):
        return {
        "id": self.id,
        "content": self.content,
        "created_on": self.created_on,       
        "updated_on": self.updated_on
        }

