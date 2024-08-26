import request from "supertest";
import app from "../App.js";
import db from "../db.js";

beforeAll((done) => {
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
  db.end((err) => {
    if (err) {
      console.error("Error al cerrar la conexión a la base de datos:", err);
      return done(err);
    }
    console.log("Conexión a la base de datos cerrada!");
    done();
  });
});

describe("Pruebas de integración para autenticación", () => {
  let authToken;

  test("Debería registrar un nuevo usuario", async () => {
    const response = await request(app).post("/bauApi/auth/register").send({
      usu_username: "testuser",
      usu_nombre: "Test User",
      usu_establecimiento: "Test Establishment",
      usu_password: "testpassword123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Usuario registrado con éxito"
    );
  });

  test("Debería iniciar sesión con un usuario válido", async () => {
    const response = await request(app).post("/bauApi/auth/login").send({
      usu_username: "testuser",
      usu_password: "testpassword123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Usuario logueado con éxito"
    );
    expect(response.headers["set-cookie"]).toBeDefined();
    authToken = response.headers["set-cookie"][0].split(";")[0].split("=")[1];
  });

  test("No debería iniciar sesión con credenciales inválidas", async () => {
    const response = await request(app).post("/bauApi/auth/login").send({
      usu_username: "testuser",
      usu_password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error", "Contraseña incorrecta");
  });

  test("Debería cerrar sesión correctamente", async () => {
    const response = await request(app)
      .post("/bauApi/auth/logout")
      .set("Cookie", `token=${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("User has been logged out.");
    expect(response.headers["set-cookie"][0]).toMatch(/token=;/);
  });
});
