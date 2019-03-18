/*eslint-env node, browser*/
const express = require("express");
const Swagger = require('swagger-client');
var store = require('store');


const router = express.Router();

router.post('/', function(req, res, done) {  
//   console.log(req.body.sID);
   var tk = store.get('token').token;
//   console.log(tk);

   const request = {
     url:'http://192.168.27.3:8081/web/services/university/user/' + req.body.sID,
     method: 'DELETE',
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
//    	var studentobj = JSON.parse(ress.text);
//    	Object.entries(studentobj.student).forEach(([key, value]) => console.log(`${key}: ${value}`));
//        console.log("Student: " + studentobj);
//        console.log(studentobj.student.studentID);
//        store.set('student', {student: ress.text});
        res.render('deleteByUserName', { response: ress.text, user: store.get('user').user });
        
 //       done(null, true);
        
        
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