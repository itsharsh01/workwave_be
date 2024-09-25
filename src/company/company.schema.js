const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  employeeSize: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  logo: {
    type: String, // Assuming a URL or path to the logo
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  jobs: []
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('Company', companySchema);
