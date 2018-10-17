let jobs = require("../models/jobs");
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let Jobs = require('../models/jobs');


mongoose.connect('mongodb://localhost:27017/jobsdb');

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

    let job = getByValue(jobs,req.params.id);

    if (job != null) {
        job.jobOffers += 1;
        res.json({status : 200, message : 'JobOFFER Successful' , job : job });
    }
    else
        res.send('Job NOT Found - JobOffer NOT Successful!!');


}

router.deleteJob = (req, res) => {

    let job = getByValue(jobs, req.params.id);
    let index = jobs.indexOf(job);

    let currentSize = jobs.length;
    jobs.splice(index, 1);

    if((currentSize - 1) === jobs.length)
        res.json({message: "Job Post Deleted!"});
    else
        res.json({message: "Job Post NOT Deleted!"});

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