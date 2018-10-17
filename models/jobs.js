let mongoose = require('mongoose');


let JobsSchema = new mongoose.Schema({

    id: Number,
    title: String,
    description: String,
    location: String,
    startingPRice: Number,
    jobOffers: {type:Number, default: 0}},

    {collection:'jobsdb'});

module.exports = mongoose.model('Jobs', JobsSchema);