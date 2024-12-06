// donation types
const Raise = require('../models/raise')

async function option1(req, res) {
  try {
    const currentDate = new Date();
    const educationFunds = await Raise.find({ type: 'Education' });

    const fundsWithExpiration = educationFunds.map(fund => ({
      ...fund._doc,
      isExpired: new Date(fund.date) < currentDate,
    }));

    res.json(fundsWithExpiration);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function educationDetails(req, res) {
  try {

    const fund = await Raise.findById(req.params.id);
    if (!fund) return res.status(404).json({ message: 'Fund not found' });
    res.json(fund);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function option2(req, res) {
  try {
    const currentDate = new Date();
    const educationFunds = await Raise.find({ type: 'Relief Fund' });

    const fundsWithExpiration = educationFunds.map(fund => ({
      ...fund._doc,
      isExpired: new Date(fund.date) < currentDate,
    }));

    res.json(fundsWithExpiration);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function option3(req, res) {
  try {
    const currentDate = new Date();
    const educationFunds = await Raise.find({ type: 'Medicine' });

    const fundsWithExpiration = educationFunds.map(fund => ({
      ...fund._doc,
      isExpired: new Date(fund.date) < currentDate,
    }));

    res.json(fundsWithExpiration);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function others(req, res) {
  try {
    const currentDate = new Date();
    const educationFunds = await Raise.find({ type: 'Others' });

    const fundsWithExpiration = educationFunds.map(fund => ({
      ...fund._doc,
      isExpired: new Date(fund.date) < currentDate,
    }));

    res.json(fundsWithExpiration);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { option1, option2, option3, educationDetails, others };