const router = require("express").Router();
const User = require("../model/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

router.get("/register", (req, res) => {
  res.json({ msg: "Register" });
});
//registration
const registrationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//validate the data

router.post("/register", async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //check if user is already present
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Exists");

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (error) {
    res.send(err);
  }

  //sending emails when user registers

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gautamrajat185@gmail.com",
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: "gautamrajat185@gmail.com",
    to: `${req.body.email}`,
    subject: "Sending Email",
    text: `Thankyou ${req.body.name} for registering to GOFUNDME.COM`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

//Login get request
router.get("/login", (req, res) => {
  res.json({ msg: "Login" });
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//validate the data
router.post("/login", async (req, res) => {
  //check if user is already present
  const user1 = await User.findOne({ email: req.body.email });
  //Email exists or not
  if (!user1) return res.status(400).send("Email is not found");
  //password matches or not
  const validPassword = await bcrypt.compare(req.body.password, user1.password);
  if (!validPassword) return res.status(400).send("Password is incorrect");

  res.header("auth_token", token).send(token);
  //create and asign a token
  const token = jwt.sign({ _id: user1._id }, process.env.TOKEN_SECRET);
  console.log(token);
  res.redirect("/");

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (error) {
    res.send(err);
  }
});

//Profile of  a registered user
router.get("/me/:id", async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id, {
      useFindAndModify: false,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ error: "No such user" });
  }
  next();
});

module.exports = router;
