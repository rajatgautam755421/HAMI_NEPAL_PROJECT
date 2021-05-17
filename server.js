const { request } = require("express");
const express = require("express");
const app = express();
const { connect } = require("mongoose");

const eventroutes = require("./routes/eventroutes");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/paymentroutes");

const contactRoute = require("./routes/contactForm");
const volunteerRoute = require("./routes/volunteerRoute");

const verify = require("./routes/verifyToken");
port = process.env.PORT || 5000;
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Main route
app.get("/", (req, res) => {
  res.json({ msg: "Hami Nepal" });
});
//Using middlewares for routing
app.use("/contact", contactRoute);
app.use("/user", authRoute);
app.use("/bevolunteer", volunteerRoute);
app.use("/events", eventroutes);
app.use("/donate", bookRoute);

//404 Page Not Found
app.use((req, res, next) => {
  res.status(404).send({ error: "Page Not Found" });
});

//Connecton to my local database
connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    try {
      console.log("Connected to database");
    } catch (error) {
      console.log(error);
    }
  }
);

//app listening at port 3000
app.listen(port, () => {
  console.log(`Server listening at ${port} 🚀 `);
});
