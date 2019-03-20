/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');
var sp = require('./sp');

const router = express.Router();

router.post('/', function(req, res, done) {  
   var tk = store.get('token').token;

   const request = {
     url: sp + 'student/' + req.body.sID,
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
    	var studentobj = JSON.parse(ress.text);
        res.render('updates', { titleb: 'Student by ID', studentID: studentobj.student.studentID, firstName: studentobj.student.firstName, lastName: studentobj.student.lastName, gender: studentobj.student.gender, user: store.get('user').user });       
        
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
     
  })
  .catch((err) => {
  	if (err.response.status === 403) {
    	res.render('Errormsg', { title: 'Error', response: 'Access Forbidden or Token expired', user: store.get('user').user });
    } else {
    console.log(err);            // instanceof Error
    console.log(err.response);   // response or null
    }

  });
   
 });


module.exports = router;