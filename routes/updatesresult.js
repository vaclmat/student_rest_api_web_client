/*eslint-env node */
var express = require('express');
var router = express.Router();
var store = require('store');
const Swagger = require('swagger-client');
var sp = require('./sp');

router.post('/', function(req, res, next) {
   var tk = store.get('token').token;

   const request = {
     url: sp + 'students',
     method: 'PUT',
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
        res.render('updatesresult', { user: store.get('user').user, response: ress.text });
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	next(null, false);
    }
     
  })
  .catch((err) => {
    if (err.response.status === 403) {
    	res.render('ByUserName', {response: 'Access Forbidden or Token expired', user: store.get('user').user });
    } else {
    	console.log(err);            // instanceof Error
        console.log(err.response);   // response or null
    }
  });
   
 });


module.exports = router;
