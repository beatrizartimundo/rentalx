import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);
  
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'xxxxxx')
      `
      );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("shoud be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions")
    .send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    const { token } = responseToken.body;

    const responsePost = await request(app)
    .post("/categories")
    .send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(responsePost.status).toBe(201);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});