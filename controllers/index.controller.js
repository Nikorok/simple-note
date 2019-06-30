const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');
const auth = require('../utils/auth');

router.get('/', auth.isLoggedIn, (req, res) => {
  Note.find(req.user.role != 'admin' ? {author: req.user.username} : {})
    .then((notes) => {
      res.render('index', {user: req.user, notes});
    })
    .catch((error)=>{
      console.error(error);
    })

});

module.exports = router;