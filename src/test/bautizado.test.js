import request from "supertest";
import app from "../App.js";
import db from "../db.js";

beforeAll((done) => {
  // Conectar a la base de datos antes de las pruebas
  db.connect((err) => {
    if (err) {
      console.error("Error en la conexión a la base de datos:", err);
      return done(err);
    }
    console.log("Conexión exitosa a la base de datos!");
    done();
  });
});

afterAll((done) => {
  // Cerrar la conexión a la base de datos después de las pruebas
  db.end((err) => {
    if (err) {
      console.error("Error al cerrar la conexión a la base de datos:", err);
      return done(err);
    }
    console.log("Conexión a la base de datos cerrada!");
    done();
  });
});

describe("Pruebas de integración para el controlador de ministros", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/bauApi/auth/login")
      .send({ usu_username: "codaki", usu_password: "12345" });
    const headers = res.headers; // Get the headers from the response
    const cookie = headers["set-cookie"][0]; // Get the first cookie string
    token = cookie.split(";")[0].split("=")[1]; // Split by ';' and then by '=' to get the token value
  });

  test("Debería crear un nuevo ministro", async () => {
    const response = await request(app)
      .post("/bauApi/ministros/createMinistro")
      .set("Cookie", `token=${token}`)
      .send({
        min_nombre: "Ministro Prueba",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("min_nombre", "Ministro Prueba");
  });

  test("Debería obtener todos los ministros", async () => {
    console.log(token);
    const response = await request(app)
      .get("/bauApi/ministros/getMinistros")
      .set("Cookie", `token=${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Debería obtener un ministro por ID", async () => {
    // Primero crear un ministro para obtener su ID
    const createRes = await request(app)
      .post("/bauApi/ministros/createMinistro")
      .set("Cookie", `token=${token}`)
      .send({
        min_nombre: "Ministro Prueba ID",
      });

    const response = await request(app)
      .get(`/bauApi/ministros/getMinistro/${createRes.body.id}`)
      .set("Cookie", `token=${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("min_nombre", "Ministro Prueba ID");
  });

  test("Debería actualizar un ministro", async () => {
    // Primero crear un ministro para actualizar
    const createRes = await request(app)
      .post("/bauApi/ministros/createMinistro")
      .set("Cookie", `token=${token}`)
      .send({
        min_nombre: "Ministro a Actualizar",
      });

    const response = await request(app)
      .put(`/bauApi/ministros/updateMinistro/${createRes.body.id}`)
      .set("Cookie", `token=${token}`)
      .send({
        min_nombre: "Ministro Actualizado",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Ministro actualizado con éxito"
    );
  });

  test("Debería eliminar un ministro", async () => {
    // Primero crear un ministro para eliminar
    const createRes = await request(app)
      .post("/bauApi/ministros/createMinistro")
      .set("Cookie", `token=${token}`)
      .send({
        min_nombre: "Ministro a Eliminar",
      });

    const response = await request(app)
      .delete(`/bauApi/ministros/deleteMinistro/${createRes.body.id}`)
      .set("Cookie", `token=${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Ministro eliminado con éxito"
    );
  });
});
