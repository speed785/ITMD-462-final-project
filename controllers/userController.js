const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.render("user/addOrEdit", {
    viewTitle: "Insert User",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "" || Null) {
    insertUser(req, res);
  } else {
    updateRecords(req, res);
  }
});

//insert the user to the database
function insertUser(req, res) {
  const user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) {
      res.redirect("user/list");
      console.log("Inserted into db successfully")
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("user/addOrEdit", {
          viewTitle: "Insert User",
          user: req.body,
        });
      }
    }
  });
}

//edit the info from the database
function updateRecords(req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("user/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("user/addOrEdit", {
            viewTitle: "Update User",
            user: req.body,
          });
        } else {
          console.log("Error while updating", err);
        }
      }
    }
  );
}

//error handler for logging in user
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      case "password":
        body["passwordError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/list", (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.render("user/list", {
        list: docs,
      });
    } else {
      console.log("Error showing list", err);
    }
  }).lean(); //skips hydrating the results document
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("user/addOrEdit", {
        viewTitle: "Update User",
        user: doc,
      });
    }
  }).lean();
});

//delete
router.get("/delete/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/user/list");
    } else {
      console.log("Error while deleting", err);
    }
  });
});

module.exports = router;