import { z } from "zod";

export const ministroSchema = z.object({
  min_nombre: z
    .string({
      required_error: "El nombre del ministro es requerido",
    })
    .min(4, {
      message: "El nombre del ministro debe tener al menos 4 caracteres",
    })
    .max(45, {
      message: "El nombre del ministro no puede exceder los 45 caracteres",
    }),
});
