const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ error: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded payload to the request object
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token or token expired' });
    }
}

module.exports = authenticateJWT;
