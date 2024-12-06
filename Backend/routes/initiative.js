const express = require('express');
const router = express.Router();
const { getInitiatives, createInitiative, getInitiativesByEmail, editInitiatives, deleteInitiative, membersJoin, getInitiativesById } = require('../controllers/initiative');

router.route('/getinitiatives').get(getInitiatives);
router.route("/createInitiative/:email").post(createInitiative);
router.route("/getInitiative/:email").get(getInitiativesByEmail);
router.route('/editInitiative/:id').put(editInitiatives)
router.delete('/deleteInitiative/:id', deleteInitiative);
router.post('/join/:initiativeId', membersJoin);
router.get('/getinit/:initiativeId', getInitiativesById);
module.exports = router;