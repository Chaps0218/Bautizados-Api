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

const router = Router();

router.get("/getMinistros", getMinistros);
router.get("/getMinistro/:id", getMinistroById);
router.post("/createMinistro", createMinistro);
router.put("/updateMinistro/:id", updateMinistro);
router.delete("/deleteMinistro/:id", deleteMinistro);

export default router;
