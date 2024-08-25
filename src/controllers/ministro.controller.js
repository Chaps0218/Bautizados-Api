import db from "../db.js";
import { ministroSchema } from "../schemas/ministro.schema.js"; // Asegúrate de crear un esquema para la validación de datos

// Crear un nuevo ministro
export const createMinistro = (req, res) => {
  try {
    const { min_nombre } = ministroSchema.parse(req.body);

    const query = "INSERT INTO ministro (min_nombre) VALUES (?)";
    db.query(query, [min_nombre], (err, result) => {
      if (err) {
        console.error("Error al crear el ministro:", err);
        return res.status(500).json({ error: "Error al crear el ministro" });
      }
      res.status(201).json({ id: result.insertId, min_nombre });
    });
  } catch (error) {
    console.error("Error en la validación:", error);
    res.status(400).json({ error: "Datos inválidos" });
  }
};

// Obtener todos los ministros
export const getMinistros = (req, res) => {
  try {
    db.query("SELECT * FROM ministro", (err, result) => {
      if (err) {
        console.error("Error al obtener los ministros:", err);
        return res
          .status(500)
          .json({ error: "Error al obtener los ministros" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

// Obtener un ministro por ID
export const getMinistroById = (req, res) => {
  try {
    const query = "SELECT * FROM ministro WHERE min_id = ?";
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        console.error("Error al obtener el ministro:", err);
        return res.status(500).json({ error: "Error al obtener el ministro" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Ministro no encontrado" });
      }
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

// Actualizar un ministro
export const updateMinistro = (req, res) => {
  try {
    const { min_nombre } = ministroSchema.parse(req.body); // Validación con el esquema

    const query = "UPDATE ministro SET min_nombre = ? WHERE min_id = ?";
    db.query(query, [min_nombre, req.params.id], (err, result) => {
      if (err) {
        console.error("Error al actualizar el ministro:", err);
        return res
          .status(500)
          .json({ error: "Error al actualizar el ministro" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Ministro no encontrado" });
      }
      res.status(200).json({ message: "Ministro actualizado con éxito" });
    });
  } catch (error) {
    console.error("Error en la validación:", error);
    res.status(400).json({ error: "Datos inválidos" });
  }
};

// Eliminar un ministro
export const deleteMinistro = (req, res) => {
  try {
    const query = "DELETE FROM ministro WHERE min_id = ?";
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        console.error("Error al eliminar el ministro:", err);
        return res.status(500).json({ error: "Error al eliminar el ministro" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Ministro no encontrado" });
      }
      res.status(200).json({ message: "Ministro eliminado con éxito" });
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};
