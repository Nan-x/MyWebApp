let mongoose = require('mongoose');


let UsersSchema = new mongoose.Schema({

        id: Number,
        name: String,
        email: String,
        password: String},


    {collection:'usersdb'});

module.exports = mongoose.model('Users', UsersSchema);