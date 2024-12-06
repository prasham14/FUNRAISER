const express = require('express');
const router = express.Router();
const { option1, option2, option3, educationDetails, others } = require('../controllers/options');

router.route('/option1').get(option1);
router.route('/option2').get(option2);
router.route('/option3').get(option3);
router.route('/others').get(others);
router.route('/option1/:id').get(educationDetails);

module.exports = router;