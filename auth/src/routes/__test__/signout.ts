import request from "supertest";
import app from "../../app";

it("clears cookies after signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "shu@shu.com", pasword: "12as" })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({ email: "shu@shu.com", password: "12as" })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeUndefined();
});
