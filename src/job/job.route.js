const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJobById, deleteJobById, shortlistJobApplication } = require('./job.controller');

router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJobById);
router.delete('/:id', deleteJobById);
router.post('/shortlist', shortlistJobApplication);

module.exports = router