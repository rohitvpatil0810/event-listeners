const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Evnet Name"],
  },
  date: {
    type: Date,
    required: [true, "Please Enter Date of Event"],
  },
  desc: {
    type: String,
  },
  organizer: {
    type: String,
    required: [true, "Please Enter Organizer Detail"],
  },
  venue: {
    type: String,
    required: [true, "Please Enter Venue of Event"],
  },
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
