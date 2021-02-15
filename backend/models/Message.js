const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
});
module.exports = mongoose.model("Message", msgSchema);
