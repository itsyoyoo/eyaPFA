
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken'); // Import jwt 
const User = require('../models/User'); // Ensure the correct path to your User model

// JWT Secret (in a real app, store this in your .env file and load it using dotenv)
const JWT_SECRET ='379d3c7ac69fcd349c05d36f7006149c72cd30ef978d2a9ef8cfd799a71eb503e5a3c7d343f9e0777abed338c7afb62dee75640c72aa3a7295b6b5df149c723a';

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login Request:", req.body);

    if (!email || !password) {
        return res.status(400).json({ error_message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error_message: 'Incorrect credentials' });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error_message: 'Password does not match' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        };

        // Generate token (valid for 1 hour, you can change the expiry as needed)
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Return token and success message
        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error_message: 'Error logging in' });
    }
};




const register = async (req, res) => {
    const { email, password, username, lastname, grade, matricule, placeOfWork } = req.body;

    if (!email || !password || !username || !lastname || !grade || !matricule || !placeOfWork) {
        return res.status(400).json({ error_message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, username, lastname, grade, matricule, placeOfWork });
        await newUser.save();
        res.json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error_message: 'Email or matricule already exists' });
        }
        res.status(500).json({ error_message: 'Error registering user', details: error.message });
    }
};
const profile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.json(user);
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
    }
}
const updateUser = async (req, res) => {
    try {
      const { email, username, lastname, matricule, grade, placeOfWork } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id, 
        { email, username, lastname, grade , matricule, placeOfWork },
        { new: true } 
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
  
  


module.exports = {
    login,
    register,
    profile,
    updateUser,
    deleteUser
};
