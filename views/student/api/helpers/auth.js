'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
var privateKEY = fs.readFileSync('/QOpenSys/pkgs/lib/nodejs8/bin/student/api/service/private.key', 'utf8');
var publicKEY = fs.readFileSync('/QOpenSys/pkgs/lib/nodejs8/bin/student/api/service/public.key', 'utf8');
var i = 'VM';
var s = 'vaclmat@email.cz';
var a = 'http://vm.cz';
var signOptions = {
 issuer: i,
 subject: s,
 audience: a,
 expiresIn: '12h'
 };
var verifyOptions = {
 issuer: i,
 subject: s,
 audience: a,
 expiresIn: '12h',
 algorithms: ["HS256"] 
 };

exports.verifyToken = function (req, authOrSecDef, token, callback) {
//   console.log(req.user);
//   Object.entries(authOrSecDef).forEach(([key, value]) => console.log(`${key}: ${value}`));
//   var currentScopes =req.swagger.operation["x-security-scopes"];
//   var currentScopes = "user";

   function sendError() {
      return req.res.status(403).json({message: 'Error: Access Denied'});
   }
//   console.log("verifyToken " + token);
//   console.log("Scopes: " + currentScopes);
   if (token && token.indexOf("Bearer ") == 0) {
//     console.log("token OK")
     var tokenString = token.split(' ')[1];
//     console.log("tokenString: " + tokenString);
     jwt.verify(tokenString, 'mamamamisumysemame', function(verificationError, decodedToken) {
//       if (verificationError == null && Array.isArray(currentScopes) && decodedToken && decodedToken.role) {
       if (verificationError == null && decodedToken) {
//          console.log("verify OK");
          var rolefvt = decodedToken.role;
//          console.log("Token role: " + rolefvt);
          var issueMatch = decodedToken.iss == i;
//          if (roleMatch && issueMatch) {
             req.user = decodedToken;
//             req.user.role = {'role': rolefvt};
             
             return callback(null);
//          } else {
//             console.log("verify error: " + verificationError);
//             return callback(sendError());
//          }
       } else {
          return callback(sendError());
       }
      });
    } else {
      return callback(sendError());
    }
};

exports.issueToken = function (username,role) {
    var token = jwt.sign({
        username: username,
        iss: i,
        role: role
     }, 'mamamamisumysemame');
     return token;
};

exports.verifyAuth = function() {
console.log("verifyAuth: ");
const AccessControl = require('accesscontrol');
var grants = {
  admin: {
    'student': {
      'read:any': ['*'],
      'delete:any': ['*']
    },
    'students': {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*']
    },
    'user': {
      'read:any': ['*'],
      'delete:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*']
    }
  },
  user: {
    'student': {
      'read:any': ['*']
    },
    'students': {
      'read:any': ['*']
    },
    'user': {
      'read:any': ['*'],
      'update:own': ['*'],
      'create:own': ['*'],
      'delete:own': ['*']
    }
  }
};

const ac = new AccessControl(grants);


}
