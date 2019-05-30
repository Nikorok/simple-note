const mongoose = require('mongoose');

module.exports = app => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', process.env.NODE_ENV === 'dev');
    mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.MONGO_URI);
}

