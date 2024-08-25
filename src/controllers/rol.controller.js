import { rolSchema } from "../schemas/rol.schema.js";
import db from "../db.js";

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

export const getRoles = async (req, res) => {
    const [roles] = await db.query("SELECT * FROM roles");
    res.json(roles);
};

export const getRol = async (req, res) => {
    const { id } = req.params;
    const [rol] = await db.query("SELECT * FROM roles WHERE rol_id = ?", [id]);
    if (rol.length === 0) {
        return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json(rol[0]);
};

export const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, permisos } = rolSchema.parse(req.body);
        const [result] = await db.query(
            "UPDATE roles SET rol_nombre = ?, rol_permisos = ? WHERE rol_id = ?",
            [nombre, permisos, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Rol no encontrado" });
        }
        res.json({ message: "Rol actualizado con éxito" });
    } catch (error) {
        res.status(400).json(error.errors.map((error) => error.message));
    }
};

export const deleteRol = async (req, res) => {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM roles WHERE rol_id = ?", [id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json({ message: "Rol eliminado con éxito" });
};