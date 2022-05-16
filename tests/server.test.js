const supertest = require("supertest");
const app = require("../src/app");

const request = supertest(app);

it("Call the / endpoint", async () => {
  const res = await request.get("/");
  expect(res.status).toBe(200);
  expect(typeof res.body).toBe("object");
  expect(res.body).toHaveProperty("error");
  expect(res.body).toHaveProperty("message");
});
