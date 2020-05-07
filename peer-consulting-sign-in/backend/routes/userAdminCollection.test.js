const router = require("./userAdminCollection.js");
const supertest = require("supertest");
const app = require("../server");
// const withAuth = require("../middleware");
const userAdmin = require("../models/userAdmin.model");

describe("UserAdmin Collection Routes", () => {
  it("Populates the entirety of the user admin collection", async () => {
    return supertest(app)
      .get("/userAdminCollection")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it("adds a user admin to the collection", async () => {
    const username = "TST";
    const password = "TST";

    return supertest(app)
      .post("/userAdminCollection/add")
      .send({ username, password })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("finds the admin in the collection", async () => {
    const adminUser = await userAdmin.findOne({ username: "TST" });

    expect(adminUser.username).toBe("TST");
  });

  it("Authenticates with credentials", async () => {
    const username = "TST";
    const password = "TST";
    return supertest(app)
      .post("/userAdminCollection/authenticate")
      .send({ username, password })
      .expect(200);
  });

  // it("gives the user the secret message", async () => {
  //   return supertest(app)
  //     .get("/userAdminCollection/secret", withAuth)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toStrictEqual({});
  //     });
  // });

  // it("checks if the token is valid", async () => {
  //   return supertest(app)
  //     .get("/userAdminCollection/checkToken", withAuth)
  //     .expect(200);
  // });

  it("deletes the admin from the collection", async () => {
    await userAdmin.findOneAndDelete({ username: "TST" });
  });

  it("Checks fails login, given a wrong user password", async () => {
    const username = "myUserAdmin";
    const password = "wrongpassword";
    return supertest(app)
      .post("/userAdminCollection/authenticate")
      .send({ username, password })
      .expect(401);
  });
});
