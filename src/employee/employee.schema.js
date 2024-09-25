const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalYears: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  experience: [experienceSchema],
  projects: [projectSchema],
  skills: [skillSchema],
  jobApplications:{
    applied:[],
    rejected:[],
    shortlisted:[],
    interviewed:[],
  },
  resume:{
    type:String,
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
