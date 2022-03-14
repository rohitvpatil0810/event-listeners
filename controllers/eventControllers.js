const Event = require("../models/event");

const handleError = (err) => {
  let errors = { name: "", date: "", desc: "", organizer: "", venue: "" };

  if (err.message.includes("event validation failed")) {
    let errorsarray = Object.values(err.errors);
    errorsarray.forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.event_post = async (req, res) => {
  const { name, desc, organizer, venue } = req.body;
  const date = new Date(req.body.date);
  if (!(date >= new Date())) {
    const errors = { date: "Date must be in future!" };
    res.status(404).json({ errors });
    return;
  }
  try {
    const event = await Event.create({ name, date, desc, organizer, venue });
    res.status(200).json({ event });
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
};

module.exports.events_get = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ events });
  } catch (err) {
    res.json(404).json({ message: "something went wrong" });
  }
};
