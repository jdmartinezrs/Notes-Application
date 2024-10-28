const jwt = require('jsonwebtoken');
exports.authCookie = (req, res, next) => {
    let authHeader = undefined;
    if(req.headers.authorization) authHeader = req.headers.authorization
    if(req.cookies.token) authHeader = req.cookies.token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.redirect("/users")
    
    jwt.verify(token, process.env.KEY_SECRET, (err, payload) => {
        if (err) return res.redirect("/users")
        next();
    });
}  

exports.auth = (req, res, next) => {
    // Retrieve the Authorization header
    let authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader);

    // Extract the token
    const token = authHeader && authHeader.split(' ')[1];

    // Check if token is provided
    if (!token) {
        console.log("Token not provided.");
        return res.status(401).json({ message: 'token no proporcionado' });
    }
    
    console.log("Extracted Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(403).json({ message: 'token invalido' });
        }
        
        console.log("Payload:", payload);
        req.user = payload; // Set the payload to req.user
        next(); // Move to the next middleware
    });

} 