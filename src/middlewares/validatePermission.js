export const validatePermission = (requiredPermission) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;

        if ((userPermissions & requiredPermission) === requiredPermission) {
            return next();
        } else {
            return res.status(403).json("Acceso denegado: No tienes el permiso requerido");
        }
    };
};
