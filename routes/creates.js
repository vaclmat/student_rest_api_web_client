/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');
var sp = require('./sp');


const router = express.Router();

router.get("/", (req, res) => {
  res.render('creates', { user: store.get('user').user });
});

router.post('/', function(req, res, done) {  
   var tk = store.get('token').token;

   const request = {
     url: sp + 'students',
     method: 'POST',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + tk
  			},
     body: JSON.stringify(req.body)
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
    if (ress.statusText === "OK") {
        res.render('createsresult', { response: ress.text, user: store.get('user').user });    
        
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
     
  })
  .catch((err) => {
  	if (err.response.status === 403) {
    	res.render('createsresult', { response: 'Token expired. Logout and Login again.', user: store.get('user').user });
    } else {
    	console.log(err);            // instanceof Error
        console.log(err.response);   // response or null
    }
  });
   
 });


module.exports = router;