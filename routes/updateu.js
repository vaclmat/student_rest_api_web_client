/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');
var sp = require('./sp');


const router = express.Router();


router.post('/', function(req, res, done) {  
   var tk = store.get('token').token;

   const request = {
     url: sp + 'user/' + req.body.sID,
     method: 'GET',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + tk
  			}
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
    if (ress.statusText === "OK") {
    	var userobj = JSON.parse(ress.text);
        res.render('updateu', { titleb: 'User by username', username: userobj['API user'].username, firstName: userobj['API user'].firstName, lastName: userobj['API user'].lastName, password: userobj['API user'].password, confirmPassword: userobj['API user'].password, userStatus: userobj['API user'].userStatus, phone: userobj['API user'].phone, userID: userobj['API user'].userID, email: userobj['API user'].email, user: store.get('user').user });
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
     
  })
  .catch((err) => {
  	if (err.response.status === 403) {
    	res.render('Errormsg', { title: 'Error message', response: 'Access Forbidden or Token Expired.', user: store.get('user').user });
    } else {
    console.log(err);            // instanceof Error
    console.log(err.response);   // response or null
    }

  });
  
   
 });


module.exports = router;