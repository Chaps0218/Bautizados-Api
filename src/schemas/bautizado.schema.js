import { z } from "zod";

export const bautizadoSchema = z.object({
  bau_nombre: z
    .string({
      required_error: "El nombre del bautizado es requerido",
    })
    .min(4, {
      message: "El nombre del bautizado debe ser más extenso",
    })
    .max(150),

  bau_padre: z
    .string({
      required_error: "El nombre del padre es requerido",
    })
    .max(150)
    .nullable(),

  bau_madre: z
    .string({
      required_error: "El nombre de la madre es requerido",
    })
    .max(150)
    .nullable(),

  bau_padrino1: z
    .string({
      required_error: "El nombre del padrino 1 es requerido",
    })
    .min(4, {
      message: "El nombre del padrino 1 debe tener al menos 4 caracteres",
    })
    .max(150),

  bau_padrino2: z
    .string({
      required_error: "El nombre del padrino 2 es requerido",
    })
    .min(4, {
      message: "El nombre del padrino 2 debe tener al menos 4 caracteres",
    })
    .max(150),

  bau_fecha: z.string({
    required_error: "La fecha de bautizo es requerida",
  }),

  bau_tomo: z.number({
    required_error: "El número de tomo es requerido",
  }),

  bau_pagina: z.number({
    required_error: "El número de página es requerido",
  }),

  bau_numero: z.number({
    required_error: "El número de bautizo es requerido",
  }),

  min_id: z.number({
    required_error: "El ID del ministro es requerido",
  }),

  usu_id: z.number({
    required_error: "El ID del usuario es requerido",
  }),
});
