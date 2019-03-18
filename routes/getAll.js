/*eslint-env node, browser*/
const express = require("express");
const Swagger = require('swagger-client');
var store = require('store');


const router = express.Router();

router.get('/', function(req, res, done) {  
   var tk = store.get('token').token;
//   console.log(tk);

   const request = {
     url:'http://192.168.27.3:8081/web/services/university/students/',
     method: 'GET',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tk
  			}
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
//    console.log("statusCode: " + res.statusCode); // status code
    if (ress.statusText === "OK") {
    	var studentobj = ress.text;
//        console.log("Students: " + studentobj);
//        store.set('student', {student: ress.text});
        res.render('getAll', { students: studentobj, user: store.get('user').user });
        
 //       done(null, true);
        
        
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