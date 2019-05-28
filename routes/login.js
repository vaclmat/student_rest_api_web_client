/*eslint-env node, browser*/
const express = require("express");
const Swagger = require('swagger-client');
var store = require('store');
var jwt = require('jsonwebtoken');
var sp = require('./sp');

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";


const router = express.Router();

router.get('/', function (req, res, next) {
 res.render('login', {title: 'Log in'});
 
 });

router.post('/', function(req, ress, done) {
   var logindata = req.body;
   const request = {
     url: sp + 'user/login',
     method: 'POST',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json'
  			},
  	body: JSON.stringify( logindata )};
 
Swagger.http(request)
  .then((res) => {
    if (res.statusText === "OK") {
    	var tokenobj = JSON.parse(res.text);
    	if (tokenobj["token"] === undefined) {
    		ress.render('login', {response: JSON.parse(res.text)});
    	} else {
        var tokenString = tokenobj["token"];
        store.set('token', {token: tokenString});
        store.set('user', {user: logindata.username});
//        req.isAuthenticated(true);
        var decoded = jwt.decode(tokenString);
        store.set('role', {role: decoded.role});
        ress.render('sservices', { titles: 'User Services', user: store.get('user').user, role: store.get('role').role});
        }
    } else {
    	console.log("statusText: " + res.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
    
  })
  .catch((err) => {
    console.log(err);            // instanceof Error
    console.log(err.response);   // response or null
  });
 });

module.exports = router;