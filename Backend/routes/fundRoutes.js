const express = require('express');
const router = express.Router();
const { raiseFund, getFundsById, editFunds, activeFunds, deleteFund, getFundsByFundId } = require('../controllers/funds');

router.route('/raise').post(raiseFund);
router.route("/getFunds/:user_id").get(getFundsById);
router.route('/editFund/:id').put(editFunds);
router.route('/active-fundraisers').get(activeFunds);
router.route('/getFund/:id').get(getFundsByFundId);
router.route('/deleteFund/:id').delete(deleteFund)
module.exports = router;
