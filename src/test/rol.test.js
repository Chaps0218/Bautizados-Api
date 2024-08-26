import request from "supertest";
import app from "../App.js";
import db from "../db.js";

describe("Pruebas de integración para operaciones CRUD de roles", () => {
  let authToken;
  let createdRoleId;

  beforeAll(async () => {
    // Configurar la conexión a la base de datos de prueba
    await new Promise((resolve, reject) => {
      db.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const response = await request(app).post("/bauApi/auth/register").send({
      usu_username: "testuser",
      usu_nombre: "Test User",
      usu_establecimiento: "Test Establishment",
      usu_password: "testpassword123",
    });
    // Iniciar sesión para obtener el token de autenticación
    const loginResponse = await request(app)
      .post("/bauApi/auth/login")
      .send({ usu_username: "testuser", usu_password: "testpassword123" });

    authToken = loginResponse.headers["set-cookie"][0]
      .split(";")[0]
      .split("=")[1];
  });

  afterAll(async () => {
    // Cerrar la conexión a la base de datos
    await new Promise((resolve, reject) => {
      db.end((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  test("Debería crear un nuevo rol", async () => {
    const response = await request(app)
      .post("/bauApi/roles")
      .set("Cookie", `token=${authToken}`)
      .send({
        rol_nombre: "Rol de prueba",
        rol_permisos: 1,
      });

    expect(response.statusCode).toBe(201);
    createdRoleId = response.body.id;
  });

  test("Debería obtener todos los roles", async () => {
    const response = await request(app)
      .get("/bauApi/roles")
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Debería obtener un rol específico", async () => {
    const response = await request(app)
      .get(`/bauApi/roles/${createdRoleId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("rol_id", createdRoleId);
    console.log("aaaaaaaaaaaaaaaa");
    console.log(createdRoleId);
    expect(response.body).toHaveProperty("rol_nombre", "Rol de prueba");
    expect(response.body).toHaveProperty("rol_permisos", 1);
  });

  test("Debería actualizar un rol", async () => {
    const response = await request(app)
      .put(`/bauApi/roles/${createdRoleId}`)
      .set("Cookie", `token=${authToken}`)
      .send({
        rol_nombre: "Rol de prueba actualizado",
        rol_permisos: 1,
      });

    expect(response.statusCode).toBe(200);
  });

  test("Debería eliminar un rol", async () => {
    const response = await request(app)
      .delete(`/bauApi/roles/${createdRoleId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
  });

  test("No debería crear un rol con datos inválidos", async () => {
    const response = await request(app)
      .post("/bauApi/roles")
      .set("Cookie", `token=${authToken}`)
      .send({
        rol_nombre: "", // Nombre vacío, debería ser inválido
        rol_permisos: "GC,GT",
      });

    expect(response.statusCode).toBe(400);
  });

  test("Debería devolver 404 al intentar obtener un rol no existente", async () => {
    const nonExistentId = 9999;
    const response = await request(app)
      .get(`/bauApi/roles/${nonExistentId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(404);
  });
});
