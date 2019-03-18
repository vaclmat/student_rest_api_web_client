/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');


const router = express.Router();

// Display the register page


router.post('/', function(req, res, done) {  
   console.log(req.body);
   var tk = store.get('token').token;
//   console.log(tk);

   const request = {
     url:'http://192.168.27.3:8081/web/services/university/student/' + req.body.sID,
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