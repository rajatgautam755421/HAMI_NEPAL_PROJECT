const router = require("express").Router();
const eventSchema = require("../model/eventSchema");

router.get("/", async (req, res) => {
  const Findall = await eventSchema
    .find({})
    .select("nameOfEvent image reason date _id ")
    .sort({
      importance: 1,
      date: -1,
    });
  res.status(200).json(Findall);
});
router.post("/", async (req, res) => {
  const user = new eventSchema({
    nameOfEvent: req.body.nameOfEvent,
    reason: req.body.reason,
    importance: req.body.importance,
    image: req.body.image,
  });
  try {
    const savedEvent = await user.save();
    res.json(savedEvent);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
