/*eslint-env node, browser*/
const express = require("express");
const Swagger = require('swagger-client');
var store = require('store');
var sp = require('./sp');


const router = express.Router();

router.post('/', function(req, res, done) {  
   var tk = store.get('token').token;

   const request = {
     url: sp + 'user/' + req.body.sID,
     method: 'DELETE',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tk
  			}
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
    if (ress.statusText === "OK") {
        res.render('deleteByUserName', { response: ress.text, user: store.get('user').user }); 
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
    
  })
  .catch((err) => {
    if (err.response.status === 403) {
    	res.render('deleteByUserName', { response: 'Token expired. Logout and Login again.', user: store.get('user').user });
    } else {
    	console.log(err);            // instanceof Error
        console.log(err.response);   // response or null
    }
  });
   
 });

module.exports = router;