const router = require("express").Router();
let signIn = require("../models/signIn.model");

router.route("/").get((req, res) => {
  signIn
    .find()
    .then(signInCollection => res.json(signInCollection))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const studentId = req.body.studentId;
  const date = req.body.date;
  const time = req.body.time;
  const purposeOfVisit = req.body.purposeOfVisit;

  const newSignIn = new signIn({ studentId, date, time, purposeOfVisit });

  newSignIn
    .save()
    .then(() => res.json("Sign-In added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/deleteAll").delete((req, res) => {
  signIn
    .deleteMany({})
    .then(() => res.json("All Sign-Ins deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  signIn
    .findById(req.params.id)
    .then(signIn => res.json(signIn))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  signIn
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Sign-In deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
