import { z } from 'zod';

export const rolSchema = z.object({
    rol_nombre: z.string({
        required_error: 'El nombre del rol es requerido'
    }).min(4, {
        message: 'El nombre del rol debe tener al menos 4 caracteres'
    }).max(50),

    rol_permisos: z.number({
        required_error: 'El permiso del rol es requerido'
    }).min(1, {
        message: 'El permiso del rol debe tener al menos 1 caracteres'
    }).max(4)
});