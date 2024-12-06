const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
  AccountNo: { type: Number, required: true, unique: true },
  Bank: { type: String, required: true },
  AdhaarNo: { type: Number, required: true, unique: true },
  Address: { type: String },
  mobileNo: { type: String, required: true, unique: true },
  Upi: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }
}, { timestamps: true });

const UserDetails = mongoose.model('UserDetails', UserDetailSchema);
module.exports = UserDetails;
