const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const userDish = require("../models/card");
const { validationResult } = require("express-validator");

const loginFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    const { email, password } = req.body;
    const dbUser = await userModel.findOne({ email });

    if (!dbUser) {
      return res.status(200).json({ message: "email not found", error: true });
    }
    console.log(dbUser.password);
    const passwordMatch = await bcrypt.compare(password, dbUser.password); //unhashed and compared
    // const passwordMatch = await password === dbUser.password;
    console.log("pasword entered", password);
    console.log("dbuser.pasword from db", dbUser.password);
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ message: "password is incorrect", error: true });
    }
    const token = jwt.sign({ userId: dbUser._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    console.log("jwt token", token);
    //   localStorage.setItem("jwt", token);
    res.status(200).json({ message: "login successful", error: false, token });
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .json({ message: err.message || "Something went wrong", error: true });
  }
};

const addNewDish = async (req, res) => {
  try {
    const { name, selectedType, description, price, base64Image } = req.body;

    // if (!base64Image) {
    //   return res.status(400).json({ message: "Missing image data" });
    // }

    const newDish = new userDish({
      name,
      price,
      selectedType,
      description,
      base64Image,
    });

    const savedDish = await newDish.save();

    res
      .status(200)
      .json({ message: "Dish created successfully", dish: savedDish });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error add new dish", error: err.message });
  }
};

const getAllDish = async (req, res) => {
  try {
    // const allDish = await userDish.find({ name: "asas"});


    const readAllTodo = await userDish.find();
    res.send(readAllTodo);
    // res.send(allDish);
    // console.log(allDish)
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error get All Dish", error: err.message });
  }
};
const delAllDish = async (req, res) => {
  try{
        const delAllTodo = await userDish.deleteMany();
    res
      .status(200)
      .json({ message: "Dishes deleted X",delAllTodo });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Error get All Dish", error: err.message });
  }
};
module.exports = {
  loginFunc,
  addNewDish,
  getAllDish,
  delAllDish,
};