/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');


const router = express.Router();

// Display the register page
router.get("/", (req, res) => {
  res.render('creates', { user: store.get('user').user });
});

router.post('/', function(req, res, done) {  
   console.log(req.body);
   var tk = store.get('token').token;
//   console.log(tk);

   const request = {
     url:'http://192.168.27.3:8081/web/services/university/students',
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
//    console.log("statusCode: " + res.statusCode); // status code
//    console.log("body: " + res.body);       // JSON object or undefined
//    console.log("obj: " + res.obj);        // same as above, legacy
//    console.log("text: " + res.text);       // textual body, or Blob
//    console.log("headers: " + res.headers);    // header hash 
    if (ress.statusText === "OK") {
//    	var studentobj = JSON.parse(ress.text);
//    	Object.entries(studentobj.student).forEach(([key, value]) => console.log(`${key}: ${value}`));
//        console.log("Student: " + studentobj);
//        console.log(studentobj.student.studentID);
//        store.set('student', {student: ress.text});
//        res.render('ByID', { titleb: 'Student by ID', studentID: studentobj.student.studentID, firstName: studentobj.student.firstName, lastName: studentobj.student.lastName, gender: studentobj.student.gender, user: store.get('user').user });
        res.render('createsresult', { response: ress.text, user: store.get('user').user });
 //       done(null, true);
        
        
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