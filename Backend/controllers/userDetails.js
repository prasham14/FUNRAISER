const UserDetails = require('../models/userDetails');
const User = require('../models/User');

async function fillDetails(req, res) {
  const { AccountNo, Bank, AdhaarNo, Address, mobileNo, Upi, user_id } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const userDetails = await UserDetails.findOneAndUpdate(
      { userId: user_id },
      { AccountNo, Bank, AdhaarNo, Address, mobileNo, Upi, userId: user_id },
      { new: true, upsert: true }
    );

    res.status(201).json(userDetails);
  } catch (error) {
    console.error('Error in fillDetails:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
}

async function getUserDetailsById(req, res) {
  const userId = req.params.user_id;

  try {
    const details = await UserDetails.findOne({ userId });
    if (!details) return res.status(404).json({ message: 'No details found for this user.' });

    res.json(details);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { fillDetails, getUserDetailsById };
