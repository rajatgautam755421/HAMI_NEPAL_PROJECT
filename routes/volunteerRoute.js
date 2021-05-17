const express = require("express");
const router = require("express").Router();
const nodeMailer = require("nodemailer");
const volunteerSchema = require("../model/beVolunteer");
var NodeGeocoder = require("node-geocoder");
const bodyParser = require("body-parser");
require("dotenv").config();

router.use(express.json()); // for parsing routerlication/json
router.use(express.urlencoded({ extended: true })); // for parsing application

router.post("/", async (req, res) => {
  const volunteer = new volunteerSchema({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    address: req.body.address,
    qualification: req.body.qualification,
    experience: req.body.experience,
  });

  try {
    const user = await volunteer.save();
    res.json(user);
  } catch (error) {
    res.send(err.message);
  }

  //Nodemailer
  var transporter = nodeMailer.createTransport({
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
    text: `${req.body.name} has been registered as a volunteer for Hami Nepal`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  //For GeoCoder
  let geocoder = NodeGeocoder({
    provider: "opencage",
    apiKey: process.env.OCD_API_KEY,
  });

  const geo = await geocoder.geocode(`${req.body.address}`);
  console.log(geo);
});
router.get("/", (req, res) => {
  res.json({ success: true, email: req.body.email });
});

module.exports = router;
