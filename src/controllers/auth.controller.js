import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";
import db from "../db.js";

export const register = (req, res) => {
    const { username, nombre, establecimiento, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = "INSERT INTO usuario (usu_usuario, usu_nombre, usu_establecimiento, usu_password, rol_id) VALUES (?, ?, ?, ?, ?)";
    const values = [username, nombre, establecimiento, hashedPassword, 1];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error al registrar el usuario:", err);
            return res.status(500).json({ error: "Error al registrar el usuario" });
        }
        console.log("Usuario registrado con éxito");
        res.status(201).json({ message: "Usuario registrado con éxito" });
    });
};

export const login = (req, res) => {
    const { username, password } = req.body;
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const query = "SELECT * FROM usuario WHERE usu_usuario = ?";
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error("Error al buscar el usuario:", err);
            return res.status(500).json({ error: "Error al buscar el usuario" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(password, user.usu_password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const q = "SELECT rol_permisos FROM rol WHERE rol_id = ?";
        db.query(q, [user.rol_id], (err, result) => {
            if (err) {
                console.error("Error al buscar los permisos del rol:", err);
                return res.status(500).json({ error: "Error al buscar los permisos del rol" });
            }
            const rol = result[0];
            const permisos = rol.rol_permisos;
            const token = jwt.sign({ id: user.usu_id, permisos }, TOKEN_SECRET, { expiresIn: 28800 });
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });

            res.status(200).json({ message: "Usuario logueado con éxito" });
        });
    });
};

export const logout = (req, res) => {
    res.clearCookie("token", {
        sameSite: "none",
        secure: true,
        expires: new Date(0),
    })
        .status(200)
        .json("User has been logged out.");
};

// export const verifyToken = async (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(403).json({ error: "No token provided" });
//     }

//     jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }
//         const q = "SELECT * FROM usuario WHERE usu_id = ?";
//         db.query(q, [decoded.id], (err, result) => {
//             if (err) {
//                 console.error("Error al buscar el usuario:", err);
//                 return res.status(500).json({ error: "Error al buscar el usuario" });
//             }

//             if (result.length === 0) {
//                 return res.status(404).json({ error: "Usuario no encontrado" });
//             }

//             const user = result[0];
//             res.status(200).json({
//                 id: user.usu_id,
//                 username: user.usu_usuario,
//                 nombre: user.usu_nombre,
//                 establecimiento: user.usu_establecimiento,
//             });
//         });
//     });
// }
