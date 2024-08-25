import { Router } from "express";
import {
  createMinistro,
  deleteMinistro,
  getMinistroById,
  getMinistros,
  updateMinistro,
} from "../controllers/ministro.controller.js";
import { validatePermission } from "../middlewares/validatePermission.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { ministroSchema } from "../schemas/ministro.schema.js";
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get("/getMinistros", authRequired, validatePermission(process.env.GC), getMinistros);
router.get("/getMinistro/:id", authRequired, validatePermission(process.env.GC), getMinistroById);
router.post("/createMinistro", authRequired, validatePermission(process.env.TODO), validateSchema(ministroSchema), createMinistro);
router.put("/updateMinistro/:id", authRequired, validatePermission(process.env.TODO), validateSchema(ministroSchema), updateMinistro);
router.delete("/deleteMinistro/:id", authRequired, validatePermission(process.env.TODO), deleteMinistro);

export default router;
