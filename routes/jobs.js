let jobs = require("../models/jobs");
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let Jobs = require('../models/jobs');

var mongodbUrl = 'mongodb://jobsdb:rhianna123@ds223578.mlab.com:23578/jobsdb'
mongoose.connect(mongodbUrl);

let db = mongoose.connection;

db.on('error', function(err) {console.log('Unable to Connect To [ ' + db.name+']', err);});
db.once('open', function(){console.log('Successfully Connected to [' +db.name+']' );});


router.findAll = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Jobs.find(function (err, jobs) {
     if(err)
         res.send(err);
  else

     res.send(JSON.stringify(jobs,null,5));
    });

}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Jobs.find({"id": req.params.id}, function(err, job){
        if(err)
            res.json({message: "Job NOT Found", errmsg: err });
        else
            res.send(JSON.stringify(job,null,5));
    });


}

router.addJob = (req, res) => {

    let id = Math.floor((Math.random() * 100000) + 1);
    var job = new Jobs();

        job.id = id;
        job.title =  req.body.title;
        job.description = req.body.description;
        job.location = req.body.location;
        job.startingPrice = req.body.startingPrice;


    job.save(function (err) {
        if (err)
            res.json({message: "Job NOT Posted", errmsg: err});
        else
            res.json({message: "Job Posted", data: job});
    });
}

router.incrementJobOffers = (req, res) => {

 Jobs.findById(req.params.id, function(err,job){
     if(err)
         res.json({message: "Job NOT Found", errmsg : err } );
     else{
         job.jobOffers += 1;
         job.save(function (err) {
             if(err)
                 res.json({message : "Job Offer could NOT be made", errmsg : err});
             else
                 res.json({message : "Job Off Successfully MAde", errmsg : err});
         });
     }
  });

}

router.deleteJob = (req, res) => {

Jobs.findByIdAndRemove(req.params.id, function(err){
    if(err)
        res.json({ message: "Job not Deleted", errmsg : err});
    else
        res.json({message: "Job DELETED!"});
    });

}

/*router.findTotalJobOffers = (req, res) => {

    let jobOffers = getTotalVotes(jobs);
    res.json({totalJobOffers : jobOffers});
}*/


function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

function getTotalJobOffers(array) {
    let totalJobOffers = 0;
    array.forEach(function(obj) { totalJobOffers += obj.jobOffers; });
    return totalJobOffers;
}


module.exports = router;