// Import our User schema
const router = require("express").Router();
let userAdmin = require("../models/userAdmin.model");
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware");

const secret = "OITAdmin!@4u";

router.route("/").get((req, res) => {
  userAdmin
    .find()
    .then((userAdminCollection) => res.json(userAdminCollection))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST route to register a user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUserAdmin = new userAdmin({ username, password });
  newUserAdmin
    .save()
    .then(() => res.json("userAdmin registered!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/authenticate").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userAdmin.findOne({ username }, function (err, userAdmin) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!userAdmin) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      userAdmin.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { userAdmin };
          const token = jwt.sign(payload, secret, {
            expiresIn: "5m",
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

router.route("/secret", withAuth).get((req, res) => {
  res.send("The password is potato");
});

router.route("/checkToken", withAuth).get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
