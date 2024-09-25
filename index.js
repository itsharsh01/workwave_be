require('dotenv').config();
const express = require('express');
const app = express();
const port = 3030;
const routes = require('./routes');
const mongoose = require('mongoose');


app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

routes(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
