/*eslint-env node */
const express = require("express");
var store = require('store');
const Swagger = require('swagger-client');


const router = express.Router();

// Display the register page


router.post('/', function(req, res, done) {  
//   console.log(req.body);
   var tk = store.get('token').token;
//   console.log(tk);

   const request = {
     url:'http://192.168.27.3:8081/web/services/university/user/' + req.body.sID,
     method: 'GET',
     headers: {
		  'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + tk
  			}
  	};
  	
 
Swagger.http(request)
  .then((ress) => {
//    console.log("statusCode: " + res.statusCode); // status code
//    console.log("body: " + res.body);       // JSON object or undefined
//    console.log("obj: " + res.obj);        // same as above, legacy
//    console.log("text: " + res.text);       // textual body, or Blob
//    console.log("headers: " + res.headers);    // header hash 
    if (ress.statusText === "OK") {
    	var userobj = JSON.parse(ress.text);
//    	Object.entries(userobj['API user']).forEach(([key, value]) => console.log(`${key}: ${value}`));
//        console.log("User: " + ress.text);
//        console.log(userobj['API user'].username);
        res.render('updateu', { titleb: 'User by username', username: userobj['API user'].username, firstName: userobj['API user'].firstName, lastName: userobj['API user'].lastName, password: userobj['API user'].password, confirmPassword: userobj['API user'].password, userStatus: userobj['API user'].userStatus, phone: userobj['API user'].phone, userID: userobj['API user'].userID, email: userobj['API user'].email, user: store.get('user').user });
 //       res.render('updatesresult', { user: store.get('user').user, response: ress.text });
 //       done(null, true);
        
        
    } else {
    	console.log("statusText: " + ress.statusText); // status text, ie: "Not Found"
    	done(null, false);
    }
     
  })
  .catch((err) => {
  	if (err.response.status === 403) {
    	res.render('Errormsg', { title: 'Error message', response: 'Access Forbidden or Token Expired.', user: store.get('user').user });
    } else {
    console.log(err);            // instanceof Error
    console.log(err.response);   // response or null
    }

  });
  
   
 });


module.exports = router;