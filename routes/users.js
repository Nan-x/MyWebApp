
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let Users = require('../models/users');

var mongodbUrl = 'mongodb://userdb:rhianna123@ds223578.mlab.com:23578/usersdb'
mongoose.connect(mongodbUrl);

let db = mongoose.connection;

db.on('error', function(err) {console.log('Unable to Connect To [ ' + db.name+']', err);});
db.once('open', function(){console.log('Successfully Connected to [' +db.name+']' );});

router.addUser = (req, res) => {

    let id = Math.floor((Math.random() * 100000) + 1);
    var user = new Users();


    user.id = id;
    user.name =  req.body.name;
    user.email = req.body.email;
    user.password= req.body.password;



    user.save(function (err) {
        if (err)
            res.json({message: "User NOT Added", errmsg: err});
        else
            res.json({message: "User Added", data: user});
    });
}

router.findAll = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Users.find(function (err, users) {
        if(err)
            res.send(err);
        else

            res.send(JSON.stringify(users,null,5));
    });

}


router.deleteUser = (req, res) => {

    Users.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.json({ message: "User not Deleted", errmsg : err});
        else
            res.json({message: "User DELETED!"});
    });

}

module.exports = router;