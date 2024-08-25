import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const authRequired = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies.token);
    if (!token) return res.status(401).json("Acceso denegado");
    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json("Token inválido");
    }
};
