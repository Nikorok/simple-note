const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports = app => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy(
    (username, password, done) => {
      User.findOne({username})
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect login.' });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  ));

  passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    (req, username, password, done) => {
      User.findOne({username})
        .then((user) => {
          if (user) {
            return done(null, false, { message: 'This login has already taken.' });
          }
          const newUser = new User();
          newUser.username = username;
          newUser.password = bcrypt.hashSync(password, 10);
          newUser.email = req.body.email;

          done(null, newUser);
          newUser.save(function (err) {
            if (err) console.error(err);
            // saved!
          });
        })
        .catch((err) => {
          console.error(err);
        })
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
}