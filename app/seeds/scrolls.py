from app.models import db, Scroll
from faker import Faker

faker = Faker()

def seed_scrolls():

    meditations = Scroll(author="Marcus Aurelius", title="Meditations", published='2019-04-02T14:31:09.071147', body='''
    "1. Evil: the same old thing. No matter what happens, keep this in mind: It’s the sameold thing, from one end of the world to the other. It fills the history books, ancient and modern, and the cities, and thehouses too. Nothing new at all.Familiar, transient.2. You cannot quench understanding unless you put out theinsights that compose it. But you can rekindle those at will,like glowing coals. I can control my thoughts as necessary;then how can I be troubled? What is outside my mind meansnothing to it. Absorb that lesson and your feet stand firm.
    You can return to life. Look at things as you did before.
    And life returns.
    3. Pointless bustling of processions, opera arias, herds of
    sheep and cattle, military exercises. A bone flung to pet
    poodles, a little food in the fish tank. The miserable
    servitude of ants, scampering of frightened mice, puppets
    jerked on strings.
    Surrounded as we are by all of this, we need to practice
    acceptance. Without disdain. But remembering that our own
    worth is measured by what we devote our energy to.
    4. Focus on what is said when you speak and on what results
    from each action. Know what the one aims at, and what the
    other means.
    5. Is my intellect up to this? If so, then I’ll put it to work, like
    a tool provided by nature. And if it isn’t, then I’ll turn the job
    over to someone who can do better—unless I have no choice.
    Or I do the best I can with it, and collaborate with
    whoever can make use of it, to do what the community needs
    done. Because whatever I do—alone or with others—can
    aim at one thing only: what squares with those requirements.
    6. So many who were remembered already forgotten, and
    those who remembered them long gone.
    7. Don’t be ashamed to need help. Like a soldier storming a
    wall, you have a mission to accomplish. And if you’ve been
    wounded and you need a comrade to pull you up? So what?
    8. Forget the future. When and if it comes, you’ll have the
    same resources to draw on—the same logos.
    9. Everything is interwoven, and the web is holy; none of its
    parts are unconnected. They are composed harmoniously, and
    together they compose the world.
    One world, made up of all things.
    One divinity, present in them all.
    One substance and one law—the logos that all rational
    beings share.
    And one truth . . .
    If this is indeed the culmination of one process, beings
    who share the same birth, the same logos.
    10. All substance is soon absorbed into nature, all that
    animates it soon restored to the logos, all trace of them both
    soon covered over by time.
    11. To a being with logos, an unnatural action is one that
    conflicts with the logos.
    12. Straight, not straightened.
    13. What is rational in different beings is related, like the
    individual limbs of a single being, and meant to function as a
    unit.
    This will be clearer to you if you remind yourself: I am a
    single limb (melos) of a larger body—a rational one.
    Or you could say “a part” (meros)—only a letter’s
    difference. But then you’re not really embracing other
    people. Helping them isn’t yet its own reward. You’re still
    seeing it only as The Right Thing To Do. You don’t yet
    realize who you’re really helping.
    14. Let it happen, if it wants, to whatever it can happen to.
    And what’s affected can complain about it if it wants. It
    doesn’t hurt me unless I interpret its happening as harmful to
    me. I can choose not to.
    15. No matter what anyone says or does, my task is to be
    good. Like gold or emerald or purple repeating to itself, “No
    matter what anyone says or does, my task is to be emerald, my color undiminished.”
    16. The mind doesn’t get in its own way. It doesn’t frighten
    itself into desires. If other things can scare or hurt it, let them;
    it won’t go down that road on the basis of its own
    perceptions."
    ''')
    ecclesiastes = Scroll(author="Teacher", title="Ecclesiastes", published='2019-04-02T14:31:09.071147', body ="body")
    db.session.add(meditations)
    db.session.add(ecclesiastes)
    db.session.commit()

