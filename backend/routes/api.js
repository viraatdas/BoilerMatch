const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// MongoDB models

const User = require("../models/user");
const Post = require("../models/post");

// Login / Registration routes -------------------------------------------------------------

router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      // Create new User object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          // Calling .save inserts the mongo object into the collection
          newUser
            .save()
            .then(user => res.send("Success")) // .save is a promise, send the response when promise is executed
            .catch(err => res.send(err));
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
    .select("+password")
    .exec()
    .then(user => {
      // Check if user exists
      console.log("user: " + user);
      if (!user || user == null) {
        res.status(404).json({ emailnotfound: "Email not found" });
        return;
      }

      // Check password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log("password validation: " + (isMatch ? "invalid" : "valid"));

        if (isMatch) {
          console.log("ISMATCH");
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
          res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.send("Error");
    });
});

router.get("/protected", (req, res, next) => {
  //user is payload from jwt token
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      res.status(400).json({ msg: "There was an error" });
      console.log(err);
    }

    if (!user) {
      res.status(404).json({ msg: "Invalid token." });
    }

    //User found, send json
    res.send({ userData: user, msg: "authenticated" });
  })(req, res, next);
});

//-----------------------------------------------------------------------------------------

// Post data routes

// Get all posts
router.get("/posts/", (req, res) => {
  Post.find({}, err => {
    if (err) console.log(err);
  })
    .populate("user")
    .exec((err, post) => {
      if (err) res.send("Failure");
      else res.send(post);
    });
});

router.get("/posts/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) res.send("Failure");
    if (!post) res.sendStatus(404);
    else res.send(post);
  })
    .populate("user")
    .exec((err, post) => {
      if (err) res.send("Failure");
      else res.send(post);
    });
});

router.post("/posts/", (req, res) => {
  // Date is added automatically
  Post.insertMany(
    {
      title: req.body.title,
      user: req.body.user,
      body: req.body.body,
      circles: req.body.circles
    },
    err => {
      if (err) res.send("Failure");
      else res.send("Success");
    }
  );
});

router.put("/posts/:id", (req, res) => {
  let fail = false;
  Post.findById(req.params.id, (err, post) => {
    if (err) console.log(err);
    if (!post) {
      res.sendStatus(404);
    } else {
      Post.updateOne({ _id: req.params.id }, req.body, (err, post) => {
        if (err) {
          console.log(err);
          res.send("Failure");
        }
      });
    }
    res.send("Success");
  });
});

router.delete("/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      res.send("Failure");
    } else if (!post) {
      res.sendStatus(404);
    } else {
      res.send("Success");
    }
  });
});

// TODO: Returns a list of circle names
// router.get("/circles", (req, res) => {
// });

// User data routes ---------------------------------------------------------------

// Get all users
router.get("/users/", async (req, res) => {
  User.find({}, (err, users) => {
    if (err) console.log(err);
    res.send(users);
  });
});

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

router.put("/users/:id", (req, res) => {
  let fail = false;
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      res.sendStatus(404);
    } else {
      User.updateOne({ _id: req.params.id }, req.body, (err, user) => {
        if (err) {
          console.log(err);
          res.send("Failure");
        }
      });
    }
    res.send("Success");
  });
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
