const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// MongoDB models

const User = require("../models/user");

// // Login / Registration routes -------------------------------------------------------------

router.post("/register", (req, res) => {
  console.log("register req.body: ");
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      // Create new User object
      const newUser = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
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
            .then(user => res.json({ isSuccess: true })) // .save is a promise, send the response when promise is executed
            .catch(err => res.json({ isSuccess: false }));
        });
      });
    }
  });
});

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
            name: user.name,
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
      res.send("Error");
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

//     if (!user) {
//       res.status(404).json({ msg: "Invalid token." });
//     }

//     //User found, send json
//     res.send({ userData: user, msg: "authenticated" });
//   })(req, res, next);
// });

// // User data routes ---------------------------------------------------------------

// // Get all users
// router.get("/users/", async (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) console.log(err);
//     res.send(users);
//   });
// });

// router.get("/users/:id", (req, res) => {
//   User.findById(req.params.id, (err, user) => {
//     if (err) console.log(err);
//     if (user) {
//       res.send(user);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

// router.post("/users/", (req, res) => {
//   User.insertMany({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     points: 0
//   })
//     .then(user => console.log("inserted: " + user))
//     .catch(e => console.log(e));
//   res.send("Success");
// });

// router.put("/users/:id", (req, res) => {
//   let fail = false;
//   User.findById(req.params.id, (err, user) => {
//     if (err) console.log(err);
//     if (!user) {
//       res.sendStatus(404);
//     } else {
//       User.updateOne({ _id: req.params.id }, req.body, (err, user) => {
//         if (err) {
//           console.log(err);
//           res.send("Failure");
//         }
//       });
//     }
//     res.send("Success");
//   });
// });

// router.delete("/users/:id", (req, res) => {
//   User.findByIdAndDelete(req.params.id, (err, user) => {
//     if (err) {
//       res.send("Failure");
//     } else if (!user) {
//       res.sendStatus(404);
//     } else {
//       res.send("Success");
//     }
//   });
// });

module.exports = router;
