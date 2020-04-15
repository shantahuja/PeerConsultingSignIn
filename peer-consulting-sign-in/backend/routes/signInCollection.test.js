const router = require("./signInCollection");
const supertest = require("supertest");
const app = require("../server");
let SignIn = require("../models/signIn.model");

describe("Sign-in Collection routes", () => {
  it("Populates the entirety of the sign in collection", async () => {
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

  it("finds a sign-in in the collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);

    const signIn = await SignIn.findOne({ studentId: "111222333" });

    expect(signIn.date).toBe("4/8/2020");
    expect(signIn.time).toBe("8:24:35 PM");
    expect(signIn.purposeOfVisit).toBe("Tutor help");
    expect(signIn.subject).toBe("Biology");
  });

  it("deletes that specific sign from the collection", async () => {
    await SignIn.findOneAndDelete({ studentId: "111222333" });
  });

  it("deletes all sign-ins from the collection", async () => {
    return supertest(app)
      .delete("/signInCollection/deleteAll")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
