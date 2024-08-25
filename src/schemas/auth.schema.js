import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(4, {
        message: 'El nombre de usuario debe tener al menos 4 caracteres'
    }).max(50),

    nombre: z.string({
        required_error: 'El nombre es requerido'
    }).min(4, {
        message: 'El nombre debe tener al menos 4 caracteres'
    }).max(150),

    establecimiento: z.string({
        required_error: 'El establecimiento es requerido'
    }).min(4, {
        message: 'El establecimiento debe tener al menos 4 caracteres'
    }).max(150),

    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(5, {
        message: 'La contraseña debe tener al menos 5 caracteres'
    }).max(50)
});

export const loginSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(4, {
        message: 'El nombre de usuario debe tener al menos 4 caracteres'
    }).max(50),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(5, {
        message: 'La contraseña debe tener al menos 5 caracteres'
    }).max(50)
});