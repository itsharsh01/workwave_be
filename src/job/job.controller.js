const Employee = require('../employee/employee.schema');
const Job = require('./job.schema');
const mongoose = require('mongoose');

// Create a new job
const createJob = async (req, res) => {
    const { position, department, jobDescription, experienceRequired, skillRequirements } = req.body;

    if (!position || !department || !jobDescription || !experienceRequired || !skillRequirements) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newJob = new Job({
            position,
            department,
            jobDescription,
            experienceRequired,
            skillRequirements,
            postedBy: new mongoose.Types.ObjectId("66f31013215fce647b08c090")
        });
        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single job by ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a job by ID
const updateJobById = async (req, res) => {
    const { position, department, jobDescription, experienceRequired, skillRequirements, status } = req.body;

    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        job.position = position || job.position;
        job.department = department || job.department;
        job.jobDescription = jobDescription || job.jobDescription;
        job.experienceRequired = experienceRequired || job.experienceRequired;
        job.skillRequirements = skillRequirements || job.skillRequirements;
        job.status = status || job.status;

        await job.save();
        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a job by ID
const deleteJobById = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const shortlistJobApplication = async (req, res) => {
    const { jobId, status, applications } = req.body;
    
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (status === 'shortlisted') {
            // Update the Employee documents
            await Employee.updateMany(
                { _id: { $in: applications } },
                { 
                    $push: { "jobApplications.shortlisted": jobId }, // Push jobId to shortlisted
                    $pull: { "jobApplications.applied": jobId } // Pull jobId from applied
                }
            );

            // Alternatively, you can also update the job application in the Job document if needed
            job.jobApplications.shortlisted.push(...applications); // Spread operator to add multiple IDs
            
            // Remove jobId from job.jobApplications.applied
            job.jobApplications.applied = job.jobApplications.applied.filter(appId => !applications.includes(appId));
            console.log("Job Application", job.jobApplications);
        } else {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Save the job document if changes were made
        const updatedJob = await job.save();
        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJobById,
    deleteJobById,
    shortlistJobApplication
};
