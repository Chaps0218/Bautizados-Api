import app from "./app.js";
import db from "./db.js";


db.connect((err) => {
    if (err) {
        console.error(
            "Error en la conexión a la base de datos, err:",
            err
        );
        return;
    }
    console.log("Conexión exitosa a la base de datos!");
});

app.listen(8800);
console.log("Servidor en el puerto ", 8800);