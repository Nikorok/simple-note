const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');
const auth = require('../utils/auth');

router.get('/add', auth.isLoggedIn, (req, res) => {
  res.render('note/add', {user: req.user});
});

router.post('/add', auth.isLoggedIn, (req, res) => {
  const { title, body, categories } = req.body;
  Note.create({
    title,
    body,
    author: req.user.username,
    categories: categories.split(' ')
  });
  res.redirect('/');
});

router.get('/edit/:id', auth.isLoggedIn, (req, res) => {
  const { id } = req.params;
  Note.findById(id)
    .then((notes) => {
      res.render('note/edit', {notes, user: req.user});
    })
    .catch((error)=>{
      console.error(error);
    })
});

router.post('/edit/:id', auth.isLoggedIn, (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      if(req.user.username == note.author){
        const { title, body, categories } = req.body;
        Note.findByIdAndUpdate(req.params.id,{title, body, categories: categories.split(' '), author: req.user.username}, (err)=>{
          if (err) throw err;
      });
        res.redirect('/');
      }

    })
    .catch((error)=>{
      console.error(error);
    })
});

router.get('/delete/:id', auth.isLoggedIn, (req, res) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      if(req.user.username == note.author){
        Note.findByIdAndDelete(id, (err) =>{
          if (err) throw err;
        })
      }
    })
    .catch((error)=>{
      console.error(error);
    });
  res.redirect('/');
});

router.get('/search', auth.isLoggedIn, (req, res) =>{
  const {categories} = req.query;
  Note.find({ categories })
    .then((notes) => {
      res.render('index', {user: req.user, notes});
    })
    .catch((error)=>{
      console.error(error);
    })
});

router.get('/author/:username', auth.isLoggedIn, (req, res) =>{
  const { username } = req.params;
  if(req.user.username == username || req.user.role == 'admin') {
      Note.find({ author: username })
        .then((notes) => {
          res.render('note/profile', { user: req.user, notes, author: username });
        })
        .catch((error) => {
          console.error(error);
        })
  } else{
      res.redirect('/');
  }

});

module.exports = router;