/*eslint-env node, browser*/
const express = require("express");
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
const Swagger = require('swagger-client');
var store = require('store');
var jwt = require('jsonwebtoken');


const router = express.Router();
/*
// Display the login page
router.get("/", (req, res) => {
  res.render('login');
});
*/

router.get('/', function (req, res, next) {
 if (req.isAuthenticated()) {
 res.redirect('/users/services');
 }
 else{
 res.render('login', {title: 'Log in'});
 console.log("Not authenticated");
 }
 
 });

router.post('/', function(req, ress, done) {
   var logindata = req.body;
//   console.log(logindata);
//   console.log(logindata.username);
   const request = {
     url:'http://192.168.27.3:8081/web/services/university/user/login',
     method: 'POST',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json'
  			},
  	body: JSON.stringify( logindata )};
 
Swagger.http(request)
  .then((res) => {
//    console.log("statusCode: " + res.statusCode); // status code
    if (res.statusText === "OK") {
    	var tokenobj = JSON.parse(res.text);
        var tokenString = tokenobj["token"];
//        console.log("Token: " + tokenString);
        store.set('token', {token: tokenString});
        store.set('user', {user: logindata.username});
        req.isAuthenticated(true);
        var decoded = jwt.decode(tokenString);
//        console.log(decoded.role);
        store.set('role', {role: decoded.role});
        ress.render('sservices', { titles: 'User Services', user: store.get('user').user, role: store.get('role').role});
//        done(null, true);
        
        
    } else {
    	console.log("statusText: " + res.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
    
//    console.log("body: " + res.body);       // JSON object or undefined
//    console.log("obj: " + res.obj);        // same as above, legacy
//    console.log("text: " + res.text);       // textual body, or Blob
//    console.log("headers: " + res.headers);    // header hash  
  })
  .catch((err) => {
    console.log(err);            // instanceof Error
    console.log(err.response);   // response or null
  });
//  res.redirect('/users/services');
 });

module.exports = router;