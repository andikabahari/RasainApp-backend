const supertest = require("supertest");
const httpStatus = require("http-status");
const { faker } = require("@faker-js/faker");
const app = require("../src/app");

const request = supertest(app);

describe("v1", () => {
  let token;
  let newUser = {
    fullName: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: "fakepassword",
  };

  it("GET /", async () => {
    await request
      .get("/")
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/)
      .field("error", false);
  });

  it("POST /v1/auth/register", async () => {
    const res = await request
      .post("/v1/auth/register")
      .send(newUser)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error", false);
  });

  it("POST /v1/auth/login", async () => {
    const res = await request
      .post("/v1/auth/login")
      .send({
        email: newUser.email,
        password: newUser.password,
      })
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error", false);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
    token = res.body.data.user.token;
    newUser.userId = res.body.data.user.userId;
  });

  it("GET /v1/users/:id", async () => {
    const res = await request
      .get(`/v1/users/${newUser.userId}`)
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error", false);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
  });

  it("PUT /v1/users/:id", async () => {
    newUser.fullName = faker.name.findName();
    const res = await request
      .put(`/v1/users/${newUser.userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ fullName: newUser.fullName })
      .expect(httpStatus.OK)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error", false);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
  });

  it("POST /v1/predictions", async () => {
    const res = await request
      .post(`/v1/predictions`)
      .set("Authorization", `Bearer ${token}`)
      .expect(httpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("error", true);
  });
});
