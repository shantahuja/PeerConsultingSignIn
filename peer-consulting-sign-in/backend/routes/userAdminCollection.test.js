const router = require("./userAdminCollection.js");
const supertest = require("supertest");
const app = require("../server");
const userAdmin = require("../models/userAdmin.model");

const mongoose = require("mongoose");
const databaseName = "test";

// beforeAll(async () => {
//   //const url = `mongodb://127.0.0.1/${test}`;
//   //await mongoose.connect(url, { useNewUrlParser: true });
// });
/*
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: "OITAdmin", // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
*/

describe("UserAdmin Collection Routes", () => {
  it("Populates the entirety of the user admin collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);
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
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);

    const username = "TST";
    const password = "TST";

    return supertest(app)
      .post("/userAdminCollection/add")
      .send({ username, password })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("Checks the Admin and Password entry against the admin document in database", async () => {
    const username = "TST";
    const password = "TST";
    return supertest(app)
      .post("/userAdminCollection/authenticate")
      .send({ username, password })
      .expect(200);
  });
  it("Checks fails login, given a wrong user password", async () => {
    const username = "myUserAdmin";
    const password = "wrongpassword";
    return supertest(app)
      .post("/userAdminCollection/authenticate")
      .send({ username, password })
      .expect(401);
  });

  it("gives the user the secret message", async () => {
    return supertest(app)
      .get("/userAdminCollection/secret")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe("The password is potato");
      });
  });

  it("checks if the token is valid", async () => {
    return supertest(app).get("/userAdminCollection/checkToken").expect(200);
  });
});

/*

router.route("/secret", withAuth).get((req, res) => {
  res.send("The password is potato");
});

router.route("/checkToken", withAuth).get((req, res) => {
  res.sendStatus(200);
});
*/
