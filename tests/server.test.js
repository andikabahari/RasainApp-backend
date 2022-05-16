const supertest = require("supertest");
const app = require("../src/app");

const request = supertest(app);

it("Call the / endpoint", async () => {
  const res = await request.get("/");
  expect(res.status).toBe(200);
  expect(res.body).toStrictEqual({
    error: false,
    message: "Welcome!",
  });
});
