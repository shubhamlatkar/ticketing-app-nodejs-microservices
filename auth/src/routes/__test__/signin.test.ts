import request from "supertest";
import app from "../../app";

it("fails when email does not exist", async () => {
  await request(app)
    .post("/api/users/signing")
    .send({ email: "shu@abc.com", password: "12as" })
    .expect(400);
});

it("fails when password does not match", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "shu@shu.com", pasword: "12as" })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({ email: "shu@shu.com", password: "12asd " })
    .expect(400);
});

it("fails when password does not match", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "shu@shu.com", pasword: "12as" })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({ email: "shu@shu.com", password: "12as" })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
