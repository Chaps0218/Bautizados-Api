import db from "../db.js";
import { bautizadoSchema } from "../schemas/bautizado.schema.js";

export const createBautizado = (req, res) => {
  try {
    const {
      bau_nombre,
      bau_padre,
      bau_madre,
      bau_padrino1,
      bau_padrino2,
      bau_fecha,
      bau_tomo,
      bau_pagina,
      bau_numero,
      min_id,
      usu_id,
    } = bautizadoSchema.parse(req.body);

    const query =
      "INSERT INTO bautizado (bau_nombre, bau_padre, bau_madre, bau_padrino1, bau_padrino2, bau_fecha, bau_tomo, bau_pagina, bau_numero, min_id, usu_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      bau_nombre,
      bau_padre,
      bau_madre,
      bau_padrino1,
      bau_padrino2,
      bau_fecha,
      bau_tomo,
      bau_pagina,
      bau_numero,
      min_id,
      usu_id,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al registrar el bautizado:", err);
        return res
          .status(500)
          .json({ error: "Error al registrar el bautizado" });
      }
      console.log("Bautizado registrado con éxito");
      res.status(201).json({
        message: "Bautizado registrado con éxito",
        id: result.insertId,
        bau_nombre,
      });
    });
  } catch (error) {
    console.error("Error en la validación de datos:", error);
    res.status(400).json(error.errors.map((err) => err.message));
  }
};

export const getBautizados = (req, res) => {
  const query = "SELECT * FROM bautizado";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los bautizados:", err);
      return res.status(500).json({ error: "Error al obtener los bautizados" });
    }
    res.status(200).json(results);
  });
};

export const getBautizadoById = (req, res) => {
  const query = "SELECT * FROM bautizado WHERE bau_id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error al obtener el bautizado:", err);
      return res.status(500).json({ error: "Error al obtener el bautizado" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Bautizado no encontrado" });
    }
    res.status(200).json(results[0]);
  });
};

export const updateBautizado = (req, res) => {
  try {
    const {
      bau_nombre,
      bau_padre,
      bau_madre,
      bau_padrino1,
      bau_padrino2,
      bau_fecha,
      bau_tomo,
      bau_pagina,
      bau_numero,
      min_id,
      usu_id,
    } = bautizadoSchema.parse(req.body);

    const query =
      "UPDATE bautizado SET bau_nombre = ?, bau_padre = ?, bau_madre = ?, bau_padrino1 = ?, bau_padrino2 = ?, bau_fecha = ?, bau_tomo = ?, bau_pagina = ?, bau_numero = ?, min_id = ?, usu_id = ? WHERE bau_id = ?";
    const values = [
      bau_nombre,
      bau_padre,
      bau_madre,
      bau_padrino1,
      bau_padrino2,
      bau_fecha,
      bau_tomo,
      bau_pagina,
      bau_numero,
      min_id,
      usu_id,
      req.params.id,
    ];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Error al actualizar el bautizado:", err);
        return res
          .status(500)
          .json({ error: "Error al actualizar el bautizado" });
      }
      res.status(200).json({ message: "Bautizado actualizado con éxito" });
    });
  } catch (error) {
    console.error("Error en la validación de datos:", error);
    res.status(400).json(error.errors.map((err) => err.message));
  }
};

export const deleteBautizado = (req, res) => {
  const query = "DELETE FROM bautizado WHERE bau_id = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) {
      console.error("Error al eliminar el bautizado:", err);
      return res.status(500).json({ error: "Error al eliminar el bautizado" });
    }
    res.status(200).json({ message: "Bautizado eliminado con éxito" });
  });
};
