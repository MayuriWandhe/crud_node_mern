const jwt = require("jsonwebtoken");

const protect = (req, res, next) =>{
    const authHeader = req.header.authrization;
    if(!authHeader || authHeader.startsWith("Bearer")){
        return res.status(401).json({message : "Not token provided."});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey"
        );
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({message : 'Invalid token'});
    }
}

module.exports = protect;