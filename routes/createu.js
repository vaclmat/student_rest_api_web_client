/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');
var sp = require('./sp');


const router = express.Router();

router.get("/", (req, res) => {
  res.render('createu', { user: store.get('user').user });
});

router.post('/', function(req, res, done) {  
   if (req.body.password === req.body.confirmPassword) {
     var userdata = req.body;
   delete userdata['confirmPassword'];
   userdata['userID'] = parseInt(req.body['userID'], 10);
   userdata['userStatus'] = parseInt(req.body['userStatus'], 10);
   var tk = store.get('token').token;

   const request = {
     url: sp + 'user',
     method: 'POST',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + tk
  			},
     body: JSON.stringify(userdata)
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
    if (ress.statusText === "OK") {
        res.render('createuresult', { response: ress.text, user: store.get('user').user });      
        
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
     
  })
  .catch((err) => {
  	if (err.response.status === 403) {
    	res.render('createuresult', { response: 'Token expired. Logout and Login again.', user: store.get('user').user });
    } else {
    	console.log(err);            // instanceof Error
        console.log(err.response);   // response or null
    }
    });
   } else {
   	console.log("Confirm password is different from password");
   	res.render('createu', { user: store.get('user').user });
   }
 });


module.exports = router;