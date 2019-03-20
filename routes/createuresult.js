/*eslint-env node */
var express = require('express');
var router = express.Router();
var store = require('store');

router.post('/', function(req, res, next) {
  res.render('createuresult', { user: store.get('user').user});
});


module.exports = router;
