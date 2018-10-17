/*'use strict'

const logger = require('../utils/logger');
const jobs = require('../models/jobs.js');

const jobview ={
    index(req, res){
        logger.info('JobView Rendering');
        const viewData =(
            title:'Jobs',
            joblist: jobs,
        );
        logger.info('about to render', jobs);
        response.render('jobs', viewData);
    },
};

module.exports = jobView;*/