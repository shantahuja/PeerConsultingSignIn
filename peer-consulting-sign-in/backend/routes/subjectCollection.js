const router = require("express").Router();
let Subject = require("../models/subject.model");

router.route("/").get((req, res) => {
  Subject.find()
    .then((subjectCollection) => res.json(subjectCollection))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newSubject = new Subject({
    name,
    description,
  });

  newSubject
    .save()
    .then(() => res.json("Subject added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Subject.findById(req.params.id)
    .then((subject) => res.json(subject))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Subject.findByIdAndDelete(req.params.id)
    .then(() => res.json("Subject deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Subject.findById(req.params.id)
    .then((subject) => {
      subject.name = req.body.name;
      subject.description = req.body.description;

      subject
        .save()
        .then(() => res.json("Subject updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
