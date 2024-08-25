export const validatePermission = (requiredPermission) => {
    return (req, res, next) => {
        const userPermissions = req.user.permisos;
        let permisosInt = Number(requiredPermission);
        let permisosUserInt = Number(userPermissions);

        if ((permisosUserInt & permisosInt) === permisosInt) {
            return next();
        } else {
            return res.status(403).json("Acceso denegado: No tienes el permiso requerido");
        }
    };
};
