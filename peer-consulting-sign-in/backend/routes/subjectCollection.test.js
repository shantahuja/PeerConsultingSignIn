const router = require("./subjectCollection");
const supertest = require("supertest");
const app = require("../server");
let Subject = require("../models/subject.model");

describe("Subject Collection routes", () => {
  var testSubject = { name: "TST", description: "Test Subject" };

  it("Populates the entirety of the subject collection", async () => {
    return supertest(app)
      .get("/subjectCollection")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it("adds a subject to the collection", async () => {
    return supertest(app)
      .post("/subjectCollection/add")
      .send(testSubject)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("finds a subject in the collection", async () => {
    const subject = await Subject.findOne({ name: "TST" });

    expect(subject.name).toBe("TST");
    expect(subject.description).toBe("Test Subject");
  });

  it("updates a subject from the collection", async () => {
    const filter = { name: "TST" };
    const update = { description: "Test Subject Update" };

    await Subject.findOneAndUpdate(filter, update);

    const subject = await Subject.findOne({
      description: "Test Subject Update",
    });

    expect(subject.name).toBe("TST");
    expect(subject.description).toBe("Test Subject Update");
  });

  it("deletes a subject from the collection", async () => {
    await Subject.findOneAndDelete({ name: "TST" });
  });
});
