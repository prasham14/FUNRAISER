const mongoose = require('mongoose');
const RaiseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  funds: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  type: { type: String, default: 'Medicine' },
  phone: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});

const Raise = mongoose.models.Raise || mongoose.model('Raise', RaiseSchema);

module.exports = Raise;
