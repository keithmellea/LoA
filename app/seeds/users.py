from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')
    teacher = User(username='Teacher', email='deme@aa.io',
                password='password')
    aurelius = User(username='Marcus Aurelius', email='dema@aa.io',
                password='password')
    socrates = User(username='Socrates', email='dema11@aa.io',
                password='password')
    epictetus = User(username='Epictetus', email='dema2@aa.io',
                password='password')
    hannibal = User(username='Hannibal Traven', email='dema99@aa.io',
                password='password')
    pythagoras = User(username='Pythagoras', email='dema3@aa.io',
                password='password')
    gorgic = User(username='Gorgic Guine', email='dema4@aa.io',
                password='password')
    waughin = User(username='Waughin Jarth', email='dema5@aa.io',
                password='password')
    mera = User(username='Mera Llykith', email='dema6@aa.io',
                password='password')
    reven = User(username='Reven', email='dema7@aa.io',
                password='password')
    horicles = User(username='Horicles', email='dema8@aa.io',
                password='password')
    fal = User(username='Fal Droon', email='dema9@aa.io',
                password='password')
    simocles = User(username='Simocles Quo', email='dema10@aa.io',
                password='password')
    berdier = User(username='Berdier Wreans', email='dema12@aa.io',
                password='password')
    mymonphonus = User(username='Mymonphonus', email='dema13@aa.io',
                password='password')
    db.session.add(demo)
    db.session.add(teacher)
    db.session.add(aurelius)
    db.session.add(socrates)
    db.session.add(epictetus)
    db.session.add(pythagoras)
    db.session.add(gorgic)
    db.session.add(waughin)
    db.session.add(mera)
    db.session.add(reven)
    db.session.add(horicles)
    db.session.add(fal)
    db.session.add(simocles)
    db.session.add(berdier)
    db.session.add(hannibal)
    db.session.add(mymonphonus)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
