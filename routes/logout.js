/*eslint-env node */
var express = require('express');
var router = express.Router();
var store = require('store');

router.get('/', function(req, res) {
  store.remove('token');
  store.remove('user');
  res.redirect('/');
});


module.exports = router;