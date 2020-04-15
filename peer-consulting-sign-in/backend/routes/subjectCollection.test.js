const router = require("./subjectCollection");
const supertest = require("supertest");
const app = require("../server");
let Subject = require("../models/subject.model");

describe("Subject Collection routes", () => {
  it("Populates the entirety of the subject collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);
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
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);

    const name = "TST";
    const description = "Test Subject";

    return supertest(app)
      .post("/subjectCollection/add")
      .send({ name, description })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  /*

  it("finds a subject in the collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);

    const name = "TST";
    const description = "Test Subject";

    return supertest(app)
      .post("/subjectCollection/add")
      .send({ name, description })
      .expect(200);
  });
  */

  /*
  it("deletes a subject from the collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);


    return supertest(app)
      .get("/subjectCollection/add")
      .send({ name, description })
      .expect(200);
  });
  */

  /*
  it("updates a subject from the collection", async () => {
    // const res = await supertest(app).get("/subjectCollection/");
    // const data = await res.json(subjectCollection);
    // expect(Array.isArray(data)).toBe(true);


    return supertest(app)
      .get("/subjectCollection/add")
      .send({ name, description })
      .expect(200);
  });
  */
});

/* router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newSubject = new Subject({
    name,
    description
  });

    newSubject
    .save()
    .then(() => res.json("Subject added!"))
    .catch(err => res.status(400).json("Error: " + err));
  */

/*
return supertest(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          assert(response.body.email, 'foo@bar.com')
      })
  });
*/
/* 
  useEffect(() => {
    axios
      .get("http://localhost:5000/subjectCollection/")
      .then((response) => {
        setSubjectCollection(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  */
