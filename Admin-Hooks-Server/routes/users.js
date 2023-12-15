var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/user");
const userModel = require("../models/user");
const auth = require("../libs/auth");

const signupCheck = [
  check("email", "Please enter valid name").notEmpty(),
  // check('email', 'Please enter valid email').isEmail().notEmpty(),
  check("password", "Please enter password of minimum 8 characters")
    .notEmpty()
    .isLength({ min: 6 }),
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/login", signupCheck, (req, res) => {
  console.log("login routes hit");
  userController.loginFunc(req, res);
});
router.post("/addNewDish", auth, (req, res) => {
  console.log("create dish routes hit");
  userController.addNewDish(req, res);
});
router.get("/getAllDish", auth, (req, res) => {
  console.log("get all dish routes hit");
  userController.getAllDish(req, res);
});
router.get("/deleteDish", auth, (req, res) => {
  console.log("delete dish routes hit");
  userController.delAllDish(req, res);
});
router.post("/makeuser", async (req, res) => {
  try {
    await userModel.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.send({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
});

module.exports = router;
