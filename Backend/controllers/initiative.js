const Initiative = require('../models/initiative');
const User = require('../models/User');
async function createInitiative(req, res) {
  const { title, purpose, date, desc, phone } = req.body;
  const emailId = req.params.email;
  try {

    const user = await User.findOne({ email: emailId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Creating a new Initiative with the correct email field
    const newIni = new Initiative({
      title, purpose, date, desc, phone, email: emailId
    });
    // Saving the new Initiative
    const response = await newIni.save();
    return res.status(201).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getInitiatives(req, res) {
  try {
    const data = req.body;
    const initiatives = await Initiative.find(data);
    res.json(initiatives);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getInitiativesByEmail(req, res) {
  const emailId = req.params.email;
  try {
    const initiatives = await Initiative.find({ email: emailId });
    return res.json(initiatives);

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getInitiativesById(req, res) {
  const { initiativeId } = req.params;


  try {
    const initiative = await Initiative.findById(initiativeId);
    if (!initiative) {
      return res.status(404).json({ error: "Initiative not found" });
    }
    return res.json(initiative);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async function editInitiatives(req, res) {
  const id = req.params.id;
  console.log(id);
  const updatedData = req.body;

  try {
    const response = await Initiative.findByIdAndUpdate(id,
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
async function deleteInitiative(req, res) {
  const id = req.params.id;

  try {
    const deletedInitiative = await Initiative.findByIdAndDelete(id);
    if (!deletedInitiative) {
      return res.status(404).json({ message: 'Initiative not found' });
    }

    res.json({ success: true, message: 'Initiative deleted successfully' });
  } catch (error) {
    console.error('Error deleting initiative:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function membersJoin(req, res) {
  const { initiativeId } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  try {
    const initiative = await Initiative.findById(initiativeId);
    if (!initiative) {
      return res.status(404).json({ error: 'Initiative not found.' });
    }

    if (initiative.memberPhone.includes(phone)) {
      return res.status(400).json({ error: 'You are already a member of this initiative.' });
    }

    initiative.members += 1;
    initiative.memberNames.push(name);
    initiative.memberPhone.push(phone);
    await initiative.save();

    res.status(200).json({ message: 'Joined initiative successfully.', initiative });
  } catch (error) {
    console.error('Error joining initiative:', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = {
  createInitiative, getInitiatives, getInitiativesByEmail, editInitiatives, deleteInitiative, membersJoin, getInitiativesById
};