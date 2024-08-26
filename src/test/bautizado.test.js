import request from "supertest";
import app from "../App.js";
import db from "../db.js";

describe("Pruebas de integración para operaciones de bautizados", () => {
  let authToken;
  let createdBautizadoId;

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

  test("Debería crear un nuevo bautizado", async () => {
    const response = await request(app)
      .post("/bauApi/bautizados/createBautizado")
      .set("Cookie", `token=${authToken}`)
      .send({
        bau_nombre: "Juan Pérez",
        bau_padre: "Pedro Pérez",
        bau_madre: "María García",
        bau_padrino1: "Carlos López",
        bau_padrino2: "Ana Martínez",
        bau_fecha: "2023-08-25",
        bau_tomo: 1,
        bau_pagina: 1,
        bau_numero: 1,
        min_id: 1,
        usu_id: 1,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Bautizado registrado con éxito"
    );
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("bau_nombre", "Juan Pérez");

    createdBautizadoId = response.body.id;
  });

  test("Debería obtener todos los bautizados", async () => {
    const response = await request(app)
      .get("/bauApi/bautizados/getBautizados")
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Debería obtener un bautizado específico", async () => {
    const response = await request(app)
      .get(`/bauApi/bautizados/getBautizadoById/${createdBautizadoId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("bau_id", createdBautizadoId);
    expect(response.body).toHaveProperty("bau_nombre", "Juan Pérez");
  });

  test("Debería actualizar un bautizado", async () => {
    const response = await request(app)
      .put(`/bauApi/bautizados/updateBautizado/${createdBautizadoId}`)
      .set("Cookie", `token=${authToken}`)
      .send({
        bau_nombre: "Juan Pérez Actualizado",
        bau_padre: "Pedro Pérez",
        bau_madre: "María García",
        bau_padrino1: "Carlos López",
        bau_padrino2: "Ana Martínez",
        bau_fecha: "2023-08-25",
        bau_tomo: 1,
        bau_pagina: 1,
        bau_numero: 1,
        min_id: 1,
        usu_id: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Bautizado actualizado con éxito"
    );
  });

  test("Debería generar un certificado de bautizo", async () => {
    const response = await request(app)
      .get(`/bauApi/bautizados/generateCertificate/${createdBautizadoId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe("application/pdf");
    expect(response.headers["content-disposition"]).toContain(
      'attachment; filename="certificado_'
    );
  });

  test("Debería eliminar un bautizado", async () => {
    const response = await request(app)
      .delete(`/bauApi/bautizados/deleteBautizado/${createdBautizadoId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Bautizado eliminado con éxito"
    );
  });

  test("No debería crear un bautizado con datos inválidos", async () => {
    const response = await request(app)
      .post("/bauApi/bautizados/createBautizado")
      .set("Cookie", `token=${authToken}`)
      .send({
        bau_nombre: "", // Nombre vacío, debería ser inválido
        bau_padre: "Pedro Pérez",
        bau_madre: "María García",
        bau_padrino1: "Carlos López",
        bau_padrino2: "Ana Martínez",
        bau_fecha: "2023-08-25",
        bau_tomo: 1,
        bau_pagina: 1,
        bau_numero: 1,
        min_id: 1,
        usu_id: 1,
      });

    expect(response.statusCode).toBe(400);
  });

  test("Debería devolver 404 al intentar obtener un bautizado no existente", async () => {
    const nonExistentId = 9999;
    const response = await request(app)
      .get(`/bauApi/bautizados/getBautizadoById/${nonExistentId}`)
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Bautizado no encontrado");
  });
});
