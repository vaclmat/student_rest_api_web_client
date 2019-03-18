/*eslint-env node */
var express = require('express');
var router = express.Router();
var store = require('store');

/* GET home page. */
router.get('/', function(req, res) {
  req.logout();
  store.remove('token');
  store.remove('user');
  req.isAuthenticated(false);
  res.redirect('/');
});


module.exports = router;