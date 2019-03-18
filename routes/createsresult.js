/*eslint-env node */
var express = require('express');
var router = express.Router();
var store = require('store');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('createsresult', { user: store.get('user').user});
});


module.exports = router;
