/*eslint-env node, browser*/
const express = require("express");
const Swagger = require('swagger-client');
var store = require('store');
var sp = require('./sp');


const router = express.Router();

router.get('/', function(req, res, done) {  
   var tk = store.get('token').token;
//   console.log(tk);

   const request = {
     url: sp + 'students/',
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
    	var studentobj = ress.text;
        res.render('getAll', { students: studentobj, user: store.get('user').user }); 
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
    
  })
  .catch((err) => {
  	if (err.response.status === 403) {
    	res.render('getAll', { students: 'Token expired. Logout and Login again.', user: store.get('user').user });
    } else
    console.log(err);            // instanceof Error
    console.log(err.response);   // response or null
  });
   
 });

module.exports = router;