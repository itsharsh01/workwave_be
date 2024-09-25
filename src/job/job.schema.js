const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  jobDescription: {
    summary: {
      type: String,
      required: true,
    },
    keyResponsibilities: {
      type: [String], // Array of key responsibilities
      required: true,
    },
    qualifications: {
      type: [String], // Array of qualifications
      required: true,
    },
    note: {
      type: String, // Additional notes
      default: '',
    },
  },
  experienceRequired: {
    type: String,
    required: true,
  },
  skillRequirements: {
    type: [String], // Array of skills
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  jobApplications:{
    applied:[],
    rejected:[],
    shortlisted:[],
    interviewed:[],
  }
});


module.exports = mongoose.model('Job', jobSchema);
