import { Router } from "express";
import {
    createRol,
    getRoles,
    getRol,
    updateRol,
    deleteRol
} from "../controllers/rol.controller.js";
import dotenv from 'dotenv';
dotenv.config();

import { validateSchema } from "../middlewares/validator.middleware.js";
import { rolSchema } from "../schemas/rol.schema.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validatePermission } from "../middlewares/validatePermission.js";

const router = Router();

router.post("/", authRequired, validatePermission(process.env.TODO), validateSchema(rolSchema), createRol);
router.get("/", authRequired, validatePermission(process.env.GC), getRoles);
router.get("/:id", authRequired, validatePermission(process.env.GC), getRol);
router.put("/:id", authRequired, validatePermission(process.env.TODO), validateSchema(rolSchema), updateRol);
router.delete("/:id", authRequired, validatePermission(process.env.TODO), deleteRol);

export default router;