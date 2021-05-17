const router = require("express").Router();
const verify = require("./verifyToken");

const path = require("path");

router.get("/", (req, res) => {
  res.json({ msg: "Pay Here" });
});

module.exports = router;
