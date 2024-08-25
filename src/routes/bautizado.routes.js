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
import { authRequired } from "../middlewares/validateToken.js";
import { validatePermission } from "../middlewares/validatePermission.js";

import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post("/createBautizado", authRequired, validatePermission(process.env.CB), validateSchema(bautizadoSchema), createBautizado);
router.get("/getBautizados", authRequired, validatePermission(process.env.GC), getBautizados);
router.get("/getBautizadoById/:id", authRequired, validatePermission(process.env.GC), getBautizadoById);
router.put("/updateBautizado/:id", authRequired, validatePermission(process.env.MB), validateSchema(bautizadoSchema), updateBautizado);
router.delete("/deleteBautizado/:id", authRequired, validatePermission(process.env.CU), deleteBautizado);

export default router;
