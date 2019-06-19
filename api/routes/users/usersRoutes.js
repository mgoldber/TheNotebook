const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('./usersModel'); 
const userService = require('./usersService');

passport.use(User.createStrategy());

// GET /words/
router.route('/users')
    .get(async (req, res, next) => {
        User.find()
            .then((docs) => res.send(docs));
    });

router.route('/signup')
    .post(async (req, res, next) => {
        try {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email
            });
            User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    res.send(err);
                } else {
                    req.logIn(user, (err) => {
                        res.send(user);
                    });
                }
            });
        } catch (e) {
            next(e);
        }
    });

router.route('/login')
      .post(passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

router.route('/logout', (req, res) => {
    req.logout();
    res.json('User logged out.');
});


exports.router = router;