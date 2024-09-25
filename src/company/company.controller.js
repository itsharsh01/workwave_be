const Company = require('./company.schema'); // Adjust the path as necessary

// Create a new company
const createCompany = async (req, res) => {
  const { name, email, address, industry, employeeSize, description, logo, rating } = req.body;

  try {
    const newCompany = await Company.create({
      name,
      email,
      address,
      industry,
      employeeSize,
      description,
      logo,
      rating,
    });
    res.status(201).json({ message: 'Company created successfully', company: newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a company by ID
const getCompanyById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update a company by ID
const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, email, address, industry, employeeSize, description, logo } = req.body;
  try {

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.name = name || company.name;
    company.email = email || company.email;
    company.address = address || company.address;
    company.industry = industry || company.industry;
    company.employeeSize = employeeSize || company.employeeSize;
    company.description = description || company.description;
    company.logo = logo || company.logo;

    await company.save();
    
    res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
