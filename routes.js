const userRoutes = require('./src/user/user.route');
const jobRoutes = require('./src/job/job.route');
const companyRoutes = require('./src/company/company.route');
const employeeRoutes = require('./src/employee/employee.route');

const routes = (app) => {
    app.use('/user', userRoutes);
    app.use('/job', jobRoutes);
    app.use('/company', companyRoutes);
    app.use('/employee', employeeRoutes);

}

module.exports = routes