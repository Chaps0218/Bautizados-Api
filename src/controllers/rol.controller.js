import { rolSchema } from "../schemas/rol.schema";
import db from "../db";

export const createRol = async (req, res) => {
    try {
        const { nombre, permisos } = rolSchema.parse(req.body);
        const [result] = await db.query(
            "INSERT INTO roles (rol_nombre, rol_permisos) VALUES (?, ?)",
            [nombre, permisos]
        );
        res.status(201).json({ id: result.insertId, nombre });
    } catch (error) {
        res.status(400).json(error.errors.map((error) => error.message));
    }
};

export const getPermisos = async (req, res) => {
    const permiso = req.params.permiso;

};