const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// MongoDB models

const User = require("../models/user");

// Login / Registration routes -------------------------------------------------------------

router.post("/register", (req, res) => {
  console.log("register req.body: ");
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ msg: "ACC_EXISTS" });
    } else {
      // Create new User object
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        graduationYear: req.body.graduationYear,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res.status(400).json({ msg: "Invalid request" });
            return;
          }
          newUser.password = hash;

          // Calling .save inserts the mongo object into the collection
          newUser
            .save()
            .then(user => {
              res.json({ isSuccess: true });
              console.log("User saved");
            }) // .save is a promise, send the response when promise is executed
            .catch(err => {
              res.status(500).json({ isSuccess: false });
              console.log("User not saved | " + err);
            });
        });
      });
    }
  });
});

/**
 * Login API endpoint.
 *
 * Uses bcrypt to compare passwords, and sends a response with
 * one of the following response codes:
 *
 * 0 - Success
 * 1 - Account not found / Password incorrect
 * 2 - Backend Error
 */
router.post("/login", (req, res) => {
  console.log("RECEIVED POST /LOGIN");
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .select("+password") // password is by default not selected. '+' allows selection
    .exec()
    .then(user => {
      // Check if user exists
      console.log("user: " + user);
      if (!user || user == null) {
        res.status(404).json({ msg: "Email not found" });
        return;
      }

      // Check password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log("password validation: " + (isMatch ? "valid" : "invalid"));

        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.firstName + user.lastName,
            email: user.email
          };

          // Sign token
          jwt.sign(
            payload,
            process.env.SECRET,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                code: 0,
                success: true,
                token: token
              });
            }
          );
        } else {
          res.status(400).json({ msg: "Password incorrect" });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ msg: "User not found" });
    });
});

// Example protected route that returns user data associated with JWT token sent
// router.get("/protected", (req, res, next) => {
//   // returns a method, which is immediately called with (req, res, next) params
//   passport.authenticate("jwt", { session: false }, (err, user, info) => {
//     if (err) {
//       res.status(400).json({ msg: "There was an error" });
//       console.log(err);
//     }

    if (!user) {
      res.status(404).json({ msg: "Invalid token." });
    }

    //User found, send json
    res.send({ userData: user, msg: "authenticated" });
  })(req, res, next);
});

// // User data routes ---------------------------------------------------------------

router.get("/users/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post("/users/", (req, res) => {
  User.insertMany({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    points: 0
  })
    .then(user => console.log("inserted: " + user))
    .catch(e => console.log(e));
  res.send("Success");
});

router.post("/users/", (req, res) => {
  User.insertMany({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    graduationYear: req.body.graduationYear,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => console.log("inserted: " + user))
    .catch(e => console.log(e));
  res.send("Success");
});

router.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.send("Failure");
    } else if (!user) {
      res.sendStatus(404);
    } else {
      res.send("Success");
    }
  });
});

module.exports = router;
