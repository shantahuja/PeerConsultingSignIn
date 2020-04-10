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

afterEach(async () => {
  await userAdmin.deleteMany();
});

describe("UserAdmin Collection Routes", () => {
  it("Checks the Admin and Password entry against the admin document in database", async () => {
    const username = "myUserAdmin";
    const password = "OITAdmin";
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
});
