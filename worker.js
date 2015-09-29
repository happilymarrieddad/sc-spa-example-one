var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);
  
  var app = require('express')();
  
  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  httpServer.on('request', app);

  app.set('views', __dirname+'/views');
  app.set('view engine', 'jade');

  app.use(express.static(__dirname + '/public'));

  app.use('/', require('./routes/home.js'));

  app.get('*', function(req,res) {
    res.status(404).send('Unknown route ' + req.url);
  });

  /*
    In here we handle our incoming realtime connections and listen for events.
  */
  scServer.on('connection', function (client) {
    console.log("Client "+client.id+" connected to "+process.pid);
    console.log('Worker '+process.pid+' has '+scServer.clientsCount+' user(s)');

    client.on('disconnect', function() {
      console.log('Client ' + client.id + ' has disconnected');
      console.log('Worker '+process.pid+' has '+scServer.clientsCount+' user(s)');
    });

  });

  function displayActiveUsers() {
   setTimeout(function() {
     console.log('Worker '+process.pid+' has '+scServer.clientsCount+' user(s)');
     displayActiveUsers();
   },process.env.MESSAGE_TIME);
  }
};