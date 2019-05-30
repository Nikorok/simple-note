const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();

// ENV
require('dotenv').config();

app.set('rootdir', __dirname);


// Settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(
    session({
      name: 'site',
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    })
);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const config = require('./config');
for(const item of config){
    item(app);
}

const controllers = fs.readdirSync('./controllers/');
for(const controller of controllers){
  app.use('/', require(`./controllers/${controller}`))
}

app.listen(process.env.PORT, () => {
  console.log(`App is working on port ${process.env.PORT}`)
})

module.exports = app;
