from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Scroll
from app.forms import ScrollForm

scroll_routes = Blueprint("scroll", __name__)

@scroll_routes.route("/", methods=["GET"])
def getScrolls():
    '''
    get user's scrolls
    '''
    scrolls = Scroll.query.all()
    print("scrolls", scrolls)
    return {"scrolls": [scroll.to_dict() for scroll in scrolls]}


@scroll_routes.route('/', methods=["POST"])
def post_scroll():
    '''
    CREATE a scroll
    '''
    form = ScrollForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        scroll = Scroll(
            author=form.data['author'],
            title=form.data['title'],
            published=form.data['published'],
            body=form.data['body']
        )
        db.session.add(scroll)
        db.session.commit()

        return scroll.to_dict()


@scroll_routes.route('/<int:scroll_id>', methods=["PATCH"])
def edit_scroll(scroll_id):
    '''
    EDIT a scroll
    '''
    scroll = Scroll.query.get(scroll_id)
    author = request.get_json()['author']
    title= request.get_json()['title']
    published = request.get_json()['published']
    body = request.get_json()['body']

    scroll.author = author
    scroll.title = title
    scroll.published = published
    scroll.body = body
        
    db.session.commit()
    return scroll.to_dict()

@scroll_routes.route('/<id>', methods=["DELETE"])
def scroll(id):
    '''
    Delete a server
    '''

    print("TRYING TO SEE IF I GET THE ID", id)
    scroll = Scroll.query.get(id)
    db.session.delete(scroll)
    db.session.commit()
    return {"scroll": scroll.to_dict()}