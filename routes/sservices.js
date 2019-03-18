/*eslint-env node */
const express = require("express");
var store = require('store');


const router = express.Router();

// Display the register page
router.get("/", (req, res) => {
	var sID;
  res.render('sservices', {sid: sID, user: store.get('user').user, role: store.get('role').role});
});


module.exports = router;