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

  const newSignIn = new signIn({ studentId, date, time });

  newSignIn
    .save()
    .then(() => res.json("Sign-In added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
