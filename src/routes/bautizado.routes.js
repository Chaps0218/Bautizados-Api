import { Router } from "express";
import {
  createBautizado,
  deleteBautizado,
  getBautizadoById,
  getBautizados,
  updateBautizado,
} from "../controllers/bautizado.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { bautizadoSchema } from "../schemas/bautizado.schema.js";
const router = Router();

router.post(
  "/createBautizado",
  validateSchema(bautizadoSchema),
  createBautizado
);
router.get("/getBautizados", getBautizados);
router.get("/getBautizadoById/:id", getBautizadoById);
router.put(
  "/updateBautizado/:id",
  validateSchema(bautizadoSchema),
  updateBautizado
);
router.delete("/deleteBautizado/:id", deleteBautizado);

export default router;
