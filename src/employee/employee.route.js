const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, updateJobApplication } = require('./employee.controller');

router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.post('/apply', updateJobApplication);



module.exports = router;