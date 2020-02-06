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

// router.route("/deleteAll").delete((req, res) => {
//   signInCollection
//     .deleteMany({})
//     .then(() => res.json("All Sign-Ins deleted."))
//     .catch(err => res.status(400).json("Error: " + err));
// });

router.route("/allIDs").post((req, res) => {
  signIn
    .find()
    .then(signInCollection => res.json(signInCollection))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/allIDs").delete((req, res) => {
  signIn
    .find()
    .then(signInCollection => res.json(signInCollection))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

// router.route("/delete").delete(function(req, res) {
//   kennels.deleteMany({ breed: "Labrador" }, function(err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.get("/idioms/drop", function(req, res) {

//   Idiom.deleteMany({})
//   .then(function(res) {
//       res.json(res)
//   })
//   .catch(function(err) {
//       res.json(err)
//   })
// });

// router.route("/deleteAll").delete((req, res) => {
//   signIn
//     .find()
//     .then(signInCollection => res.json(signInCollection))
//     .delete(signInCollection)
//     .then(() => res.json("Sign-In Collection deleted."))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/deleteAll", function(req, res) {
//   signInCollection.deleteMany({}, function(err) {
//     if (err) {
//       res.status(500).send({ error: "Could not clead database..." });
//     } else {
//       res
//         .status(200)
//         .send({ message: "All hasp info was deleted succesfully..." });
//     }
//   });
// });
