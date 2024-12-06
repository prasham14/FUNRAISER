const mongoose = require('mongoose');
const InitiativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  desc: { type: String },
  email: { type: String, required: true },
  phone: { type: Number },
  members: {
    type: Number,
    default: 0
  },
  memberPhone: [{ type: Number }],
  memberNames: [{ type: String }]

});
const Initiative = mongoose.model('Initiative', InitiativeSchema);

module.exports = Initiative;