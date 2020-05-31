import request from "supertest";
import app from "../../app";

it("returns current user when already signin", async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("shu@shu.com");
});

it("returns null when not signin", async () => {
  const res = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
