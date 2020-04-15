const router = require("./signInCollection");
const supertest = require("supertest");
const app = require("../server");
let signIn = require("../models/signIn.model");

describe("Sign-in Collection routes", () => {
  it("Populates the entirety of the sign in collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);
    return supertest(app)
      .get("/signInCollection")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it("adds a sign-in to the collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);

    const studentId = "111222333";
    const date = "4/8/2020";
    const time = "8:24:35 PM";
    const purposeOfVisit = "Tutor help";
    const subject = "Biology";

    return supertest(app)
      .post("/signInCollection/add")
      .send({ studentId, date, time, purposeOfVisit, subject })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("deletes all sign-ins from the collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);

    return supertest(app)
      .delete("/signInCollection/deleteAll")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

/*
router.route("/deleteAll").delete((req, res) => {
  signIn
    .deleteMany({})
    .then(() => res.json("All Sign-Ins deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
*/

/*
{
    "studentId": "111222333",
     "date": "4/8/2020",
     "time": "8:24:35 PM",
     "purposeOfVisit": "Tutor help",
    "subject": "Biology",
}
*/
