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

export default router;