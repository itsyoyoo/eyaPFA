const express = require('express');
const app =express()
const db = require('./dbConnection'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import your routes
const threadRoutes = require('./routes/threadRoutes');

// Initialize the app
const PORT = 5000;// proccess.env.PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes); // Use your user routes
app.use('/api',threadRoutes);


const startServer = async () => {
  await db(); 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();



