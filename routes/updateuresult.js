/*eslint-env node */
var express = require('express');
var router = express.Router();
var store = require('store');
const Swagger = require('swagger-client');
var sp = require('./sp');

router.post('/', function(req, res, next) {
   var userdata = req.body;
   if (req.body.password === req.body.confirmPassword) {
     
   delete userdata['confirmPassword'];
   userdata['userID'] = parseInt(req.body['userID'], 10);
   userdata['userStatus'] = parseInt(req.body['userStatus'], 10);
   var tk = store.get('token').token;


   const request = {
     url: sp + 'user/' + req.body.username,
     method: 'PUT',
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
        res.render('updatesresult', { user: store.get('user').user, response: ress.text });
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	next(null, false);
    }
     
  })
  .catch((err) => {

    	console.log(err);            // instanceof Error
        console.log(err.response);   // response or null
  });
  } else {
   	console.log("Confirm password is different from password");
   	res.render('updateu', { username: userdata.username, firstName: userdata.firstName, lastName: userdata.lastName, password: userdata.password, userStatus: userdata.userStatus, phone: userdata.phone, userID: userdata.userID, email: userdata.email, user: store.get('user').user });
   }
   
 });


module.exports = router;
