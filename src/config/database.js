const mongoose = require('mongoose');

const dbName = 'edrop-api';

module.exports = {
    connect: ()=> mongoose.connect('mongodb://localhost/'+dbName, {useNewUrlParser: true, useUnifiedTopology: true}),
    
    // shothand properties
    dbName,
    connection: ()=>{
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect;
    }
}
