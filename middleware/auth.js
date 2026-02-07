import jwt from "jsonwebtoken";

const auth = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    console.log("Authorization header:", authHeader);

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message : "Not token provided."});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey"
        );
        req.user = decode;
        console.log('decode : ', decode);
        next();
    } catch (error) {
        return res.status(401).json({message : 'Invalid token'});
    }
}

export default auth;    