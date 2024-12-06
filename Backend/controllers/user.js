const User = require('../models/User');
const nodemailer = require('nodemailer');
const { generateToken } = require("./../jwt");
async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this username or email" });
    }
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    const payload = { id: savedUser.id };
    const token = generateToken(payload);

    return res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Prevents JavaScript from accessing cookies  
      sameSite: 'Lax' // Adjust based on your needs  
    };
    res.cookie('cookies', token, options);
    const userData = {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
      message: "logged in successfully"
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
}

const signOut = async (req, res) => {
  res.clearCookie('cookies');

  return res.json({
    success: true,
    message: 'loggedOut Successfully'
  })
}

async function editProfile(req, res) {
  try {
    const id = req.params.userId;
    console.log(id);
    const updatedData = req.body;
    const response = await User.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, //returns updated document
        runValidators: true, // for validations in mongoose , it checks the schema in which what is required
      }
    );
    console.log(response);
    return res.json({
      success: true,
      message: "success",
      response: response
    })
  }
  catch (error) {
    return res.json({
      message: "error occured"
    })
  }
}

async function profile(req, res) {
  try {
    const { email } = req.params;
    console.log(email);
    const response = await User.findOne({ email });
    console.log(response);
    return res.json({
      success: true,
      message: "success",
      response: response
    })
  }
  catch (error) {
    return res.json({
      message: "error occured"
    })
  }
}

async function emailVerify(req, res) {
  const { email, otp } = req.params;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Compose the email message
  const mailOptions = {
    from: process.env.STMP_USER,
    to: email,
    subject: 'Confirmation Email',
    text: 'Testing mail',
    html: `<p>Thank you for registering! here is your otp:<br/> <b>${otp}</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        success: true,
        message: "error is there"
      });
    } else {
      console.log('Email sent:', info.response);
      return res.json({
        success: true,
        message: "confirmation mail sent successfully"
      })
    }
  });
}

async function editEmail(req, res) {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const user = await User.findOneAndUpdate({ email: email }, updatedData, { new: true });
    if (user) {
      res.json({ message: 'User updated successfully', response: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

module.exports = {
  signup, login, profile, editProfile, signOut, editEmail, emailVerify
};