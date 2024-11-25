const jwt = require('jsonwebtoken');

// Use your actual JWT secret or store it in an environment variable
const JWT_SECRET ='379d3c7ac69fcd349c05d36f7006149c72cd30ef978d2a9ef8cfd799a71eb503e5a3c7d343f9e0777abed338c7afb62dee75640c72aa3a7295b6b5df149c723a';

const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    //console.log({token});

    if (!token) {
        return res.status(401).json({ error_message: 'No token, authorization denied' });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, JWT_SECRET); // Replace hard-coded secret with variable
        req.user = decoded.user; // Set the user from the decoded token
        //console.log("Decoded User ID:", req.user.id); // Log the user ID for debugging

        // Proceed to the next middleware or route
        next();
    } catch (err) {
        res.status(401).json({ error_message: err});
    }
};

module.exports = authMiddleware;
