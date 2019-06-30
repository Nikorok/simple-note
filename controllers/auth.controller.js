const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
}));

module.exports = router;