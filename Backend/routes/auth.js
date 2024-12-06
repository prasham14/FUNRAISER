const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../jwt');
const { signup, login, profile, editProfile, editEmail, emailVerify } = require('../controllers/user');

router.route('/signup').post(signup);
router.post('/login', login);
router.route("/UpdateName/:userId").put(editProfile);
router.route("/getUser/:email").get(profile);
router.route('/user/EmailVerify/:email/:otp').patch(emailVerify);
router.route('/user/editEmail/:email').patch(editEmail);
module.exports = router;
