const express = require("express");
const router = require("express").Router();
const contactSchema = require("../model/contactModel");
const nodeMailer = require("nodemailer");

router.get("/", (req, res) => {
  res.json({ msg: "Contact US" });
});
router.post("/", async (req, res) => {
  const user = new contactSchema({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedContact = await user.save();
    res.json(savedContact);
  } catch (error) {
    res.send(err);
  }

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
    text: `Thankyou ${req.body.name} for contacting us`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
