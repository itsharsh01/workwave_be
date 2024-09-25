const { default: mongoose } = require('mongoose');
const Employee = require('./employee.schema'); // Update with the correct path to your Employee model
const Job = require('../job/job.schema');

// Create an Employee
const createEmployee = async (req, res) => {
  const { name, email, password, experience, projects, skills } = req.body;
  experience.map((exp) => {
    const startDate = new Date(exp.startDate);
    const endDate = new Date(exp.endDate);
    exp.totalYears = ((endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()))/12;
  }); 
  
  try {
    const employee = new Employee({ name, email, password, experience, projects, skills });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get an Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an Employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, experience, projects, skills } = req.body;

  try {

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.password = password || employee.password;
    employee.experience = experience || employee.experience;
    employee.experience.map((exp) => (exp.totalYears = exp.endDate - exp.startDate));
    employee.projects = projects || employee.projects;
    employee.skills = skills || employee.skills;

    const updatedEmployee = await employee.save();
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an Employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateJobApplication = async (req, res) => {
//   const userId =  new mongoose.Types.ObjectId(req.body.id);
  const { userId, jobId, status } = req.body;

  try {
    const employee = await Employee.findById(userId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if( status === 'applied') {
      employee.jobApplications.applied.push(jobId);
      const result = job.jobApplications.applied.push(userId);
      await job.save();
    }else{
      return res.status(404).json({ error: 'Invalid Status' });
    }
    
    const updatedEmployee = await employee.save();
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateJobApplication
};
