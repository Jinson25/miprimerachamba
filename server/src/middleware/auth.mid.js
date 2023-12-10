import pkg from "jsonwebtoken";
const { verify } = pkg;

export default function (req, res, next) {
        
    const token = req.headers.access_token;
    if (!token) return res.status(401).send();

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send();
    }
    return next();
}