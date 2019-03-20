/*eslint-env node, browser*/
const express = require("express");
const Swagger = require('swagger-client');
var store = require('store');
var sp = require('./sp');


const router = express.Router();

router.post('/', function(req, res, done) {  

   var tk = store.get('token').token;


   const request = {
     url: sp + 'student/' + req.body.sID,
     method: 'GET',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tk
  			}
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
    if (ress.statusText === "OK") {
        res.render('ByID', { titleb: 'Student by ID', response: ress.text, user: store.get('user').user });     
        
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
     
  })
  .catch((err) => {
    if (err.response.status === 403) {
    	res.render('ByID', { titleb: 'Student by ID', response: 'Token expired. Logout and Login again.', user: store.get('user').user });
    } else {
    	if (err.response.status === 400) {
    	res.render('ByID', { titleb: 'Student by ID', response: 'Bad request. Student ID should have 9 characters.', user: store.get('user').user });
        } else {
    	  console.log(err);            // instanceof Error
         console.log(err.response);   // response or null
        }
    }
  });
   
 });

module.exports = router;