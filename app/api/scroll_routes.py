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
    return {scroll.id: scroll.to_dict() for scroll in scrolls}


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
        
    return {}


@scroll_routes.route('/<int:scroll_id>', methods=["PATCH"])
def edit_scroll(scroll_id):
    '''
    EDIT a scroll
    '''
    scroll = Scroll.query.get(scroll_id)
    print(request.json)
    print(request.get_json())
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

@scroll_routes.route('/<int:scroll_id>', methods=["DELETE"])
def delete_scroll(scroll_id):
    '''
    Delete a server
    '''

    print("TRYING TO SEE IF I GET THE ID", scroll_id)
    scroll = Scroll.query.get(scroll_id)
    db.session.delete(scroll)
    db.session.commit()
    return "scroll deleted"