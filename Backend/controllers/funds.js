const Raise = require('../models/raise');
const User = require('../models/User');
const cron = require('node-cron');
cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const deleted = await Raise.deleteMany({ date: { $lt: currentDate } });
    console.log(`Expired fundraising entries removed: ${deleted.deletedCount}`);
  } catch (error) {
    console.error('Error deleting expired fundraising entries:', error);
  }
});
async function raiseFund(req, res) {
  const { title, details, funds, raised, type, phone, user_id } = req.body;
  // const user_id = req.params.id;
  try {
    const user = await User.findById(user_id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newRaise = new Raise({
      title,
      details,
      funds,
      raised,
      type,
      phone,
      userId: user_id
    });

    const response = await newRaise.save();
    return res.status(201).json(response);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
}
async function getFundsById(req, res) {
  const userId = req.params.user_id;
  console.log(`Fetching funds for user ID: ${userId}`);

  try {
    const funds = await Raise.find({ userId: userId });

    if (!funds.length) {
      return res.status(404).json({ message: "No funds found for this user." });
    }

    console.log(funds);
    return res.json(funds);
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function editFunds(req, res) {
  const id = req.params.id;
  console.log(id);
  const updatedData = req.body;
  try {
    const response = await Raise.findByIdAndUpdate(id,
      updatedData,
      {
        new: true,
        runValidators: true
      });
    console.log(response);
    return res.json({
      success: true,
      message: "success",
      response: response
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function activeFunds(req, res) {
  try {
    const currentDate = new Date();
    const activeFundraisers = await Raise.find({ date: { $gte: currentDate } });
    res.json(activeFundraisers);
  } catch (error) {
    res.status(500).json({ msg: 'Server error fetching active fundraisers' });
  }
};

// DELETE request handler
async function deleteFund(req, res) {
  const id = req.params.id;

  try {
    const deletedFund = await Raise.findByIdAndDelete(id);
    if (!deletedFund) {
      return res.status(404).json({ message: "Fund not found" });
    }

    console.log(`Fund with ID: ${id} deleted successfully`);
    res.json({ success: true, message: "Fund deleted successfully" });
  } catch (err) {
    console.error("Error deleting fund:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getFundsByFundId(req, res) {
  const fundId = req.params.id;
  console.log(fundId);
  try {
    const funds = await Raise.findById(fundId);
    console.log(funds);


    console.log(funds);
    return res.json(funds);
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  raiseFund, getFundsById, editFunds, activeFunds, deleteFund, getFundsByFundId
};
