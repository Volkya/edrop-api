const mongoose = require('mongoose');

const dbName = 'edrop-api';

module.exports = {
    connect: ()=> mongoose.connect('mongodb://localhost/'+dbName, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false,
        useCreateIndex: true
    }),
    set: () => mongoose.set('useCreateIndex', true),
    // shothand properties
    dbName,
    connection: ()=>{
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect;
    }
}
