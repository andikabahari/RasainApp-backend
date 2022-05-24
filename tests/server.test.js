const supertest = require("supertest");
const httpStatus = require("http-status");
const app = require("../src/app");

const request = supertest(app);

it("GET /", async () => {
  try {
    await request
      .get("/")
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/)
      .field("error", false);
  } catch (err) {
    throw err;
  }
});

it("POST /v1/auth/login", async () => {
  try {
    const body = {
      email: "testing@example.com",
      password: "testing!w43b9m",
    };
    await request
      .post("/v1/auth/login")
      .attach(body)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/)
      .field("error", false);
  } catch (err) {
    throw err;
  }
});

it("POST /v1/auth/register", async () => {
  try {
    const body = {
      fullName: "Testing",
      email: "testing@example.com",
      password: "testing!w43b9m",
    };
    await request
      .post("/v1/auth/register")
      .attach(body)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/)
      .field("error", true);
  } catch (err) {
    throw err;
  }
});

it("GET /v1/users/:id", async () => {
  try {
    const userId = 1;
    await request
      .get(`/v1/users/${userId}`)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/)
      .field("error", false);
  } catch (err) {
    throw err;
  }
});

it("PUT /v1/users/:id", async () => {
  try {
    const userId = 1;
    const token = "randomtokenstring";
    const body = {
      fullName: "Testing",
      email: "testing@example.com",
      password: "testing!w43b9m",
    };
    await request
      .put(`/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .attach(body)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/)
      .field("error", false);
  } catch (err) {
    throw err;
  }
});
