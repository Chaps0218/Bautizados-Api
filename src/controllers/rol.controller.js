import db from "../db.js";
import { rolSchema } from "../schemas/rol.schema.js";

export const createRol = (req, res) => {
  try {
    const { rol_nombre, rol_permisos } = rolSchema.parse(req.body);

    const query = "INSERT INTO rol (rol_nombre, rol_permisos) VALUES (?, ?)";
    const values = [rol_nombre, rol_permisos];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al crear el rol:", err);
        return res.status(500).json({ error: "Error al crear el rol" });
      }
      res.status(201).json({ id: result.insertId, rol_nombre });
    });
  } catch (error) {
    console.error("Error de validación:", error);
    return res
      .status(400)
      .json({ error: "Datos inválidos", details: error.errors });
  }
};

export const getRoles = (req, res) => {
  const query = "SELECT * FROM rol";

  db.query(query, (err, roles) => {
    if (err) {
      console.error("Error al obtener los roles:", err);
      return res.status(500).json({ error: "Error al obtener los roles" });
    }
    res.json(roles);
  });
};

export const getRol = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM rol WHERE rol_id = ?";

  db.query(query, [id], (err, rol) => {
    if (err) {
      console.error("Error al obtener el rol:", err);
      return res.status(500).json({ error: "Error al obtener el rol" });
    }

    if (rol.length === 0) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }

    res.json(rol[0]);
  });
};

export const updateRol = (req, res) => {
  try {
    const { id } = req.params;
    const { rol_nombre, rol_permisos } = rolSchema.parse(req.body);

    const query =
      "UPDATE rol SET rol_nombre = ?, rol_permisos = ? WHERE rol_id = ?";
    const values = [rol_nombre, rol_permisos, id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al actualizar el rol:", err);
        return res.status(500).json({ error: "Error al actualizar el rol" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      res.status(200).json({ message: "Rol actualizado con éxito" });
    });
  } catch (error) {
    console.error("Error de validación:", error);
    return res
      .status(400)
      .json({ error: "Datos inválidos", details: error.errors });
  }
};

export const deleteRol = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM rol WHERE rol_id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el rol:", err);
      return res.status(500).json({ error: "Error al eliminar el rol" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }

    res.json({ message: "Rol eliminado con éxito" });
  });
};
