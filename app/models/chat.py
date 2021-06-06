from .db import db

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(30),  db.ForeignKey("users.username"), nullable=False,)
    content = db.Column(db.Text, nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    users = db.relationship("User", back_populates="user")

    def to_dict(self):
        return {
        "id": self.id,
        "author": self.author,
        "content": self.content,
        "created_on": self.created_on,       
        "updated_on": self.updated_on
        }

