from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Scroll
# from app.forms import ServerForm

scroll_routes = Blueprint("scroll", __name__)

@scroll_routes.route("/", methods=["GET"])
def getScrolls():
    '''
    get user's scrolls
    '''
    scrolls = Scroll.query.all()
    return {"scrolls": [scrolls.to_dict() for scroll in scrolls]}