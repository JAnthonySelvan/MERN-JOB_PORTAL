import request from "supertest";
import app from "../src/app.mjs";

describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `jest${Date.now()}@mail.com`,
        password: "123456",
        role: "user",
      });

    console.log(res.body); // 👈 TEMP DEBUG

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
