'use strict';

/**
 * add a new student data to the database
 *
 * body StudentRec 
 * returns createResult
 **/
exports.create = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    const {DBPool} = require('/QOpenSys/pkgs/lib/nodejs10/lib/node_modules/idb-pconnector');
    const pool = new DBPool();
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * list all students in the database
 *
 * returns getAllResult
 **/
exports.getAll = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * list student data in the database on base studentID
 *
 * id String 
 * returns getByIDResult
 **/
exports.getByID = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * delete student data from the database on base studentID
 *
 * id String 
 * no response value expected for this operation
 **/
exports.remove = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * update student data in the database
 *
 * body StudentRec 
 * returns updateResult
 **/
exports.update = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

