import request from "supertest";
import app from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@shu.com",
      password: "12as"
    })
    .expect(201);
});

it("returns a 400 with  an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "12as"
    })
    .expect(400);
});

it("returns a 400 with  an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "1"
    })
    .expect(400);
});

it("returns a 400 with  an invalid email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@shu.com",
      password: "1"
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "t",
      password: "12asds"
    })
    .expect(400);
});

it("duplicate emails not allowed", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12as"
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400);
});

it("sets a cokkie after succesful isgn-up", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "abc@shu.com", password: "12as" })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
