const express = require('express');
const router = express.Router();
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require('./company.controller'); // Adjust the path as necessary

// Create a new company
router.post('/', createCompany);

// Get all companies
router.get('/', getAllCompanies);

// Get a company by ID
router.get('/:id', getCompanyById);

// Update a company by ID
router.put('/:id', updateCompany);

// Delete a company by ID
router.delete('/:id', deleteCompany);

module.exports = router