const mailer = require("../utils/nodemailer");
const bcrypt = require('bcryptjs');
const User = require('./user.schema');

const register = async (req, res) => {
    const { name, email, password, roleId } = req.body;
  
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const user = new User({ name, email, password: hashedPassword, roleId });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Server error.' });
    }
  }

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: 'Server error.' });
    }
  }  



module.exports = {
    register, 
    login
}