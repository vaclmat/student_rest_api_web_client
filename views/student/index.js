'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    auth = require('./api/helpers/auth');


var app = require('express')();
var oas3Tools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8081;
var myLogger = {};
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
      'read:own': ['*'],
      'update:own': ['*']
    }
  }
};

//const ac = new AccessControl(grants);

// swaggerRouter configuration
var options = {
  //swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './api/controllers'),
  checkControllers: true,
  loglevel: 'debug',
//  customLogger: myLogger,
  validator: true,
  oasSecurity: true,
  securityFile: {
    Bearer: auth.verifyToken
  },
  oasAuth: true,
  grantsFile: {
    Bearer: grants
//    Bearer: auth.verifyAuth
  },
  docs: {
    apiDocs: '/api-docs',
    apiDocsPrefix: '',
    swaggerUi: '/docs',
    swaggerUiPrefix: ''
  }

  //useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};
oas3Tools.configure(options);


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
oas3Tools.initializeMiddleware(swaggerDoc, app, function () {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  //app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  //app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
//  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  //app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
