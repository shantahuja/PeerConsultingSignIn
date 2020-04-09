const router = require("./subjectCollection");
const supertest = require("supertest");
const app = require("../server");

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
});

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
