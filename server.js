var fs = require('fs');
var SocketCluster = require('socketcluster').SocketCluster;
var numCPUs = require('os').cpus().length;
var env = require('node-env-file');
env(__dirname+'/.env');

console.log("   Server is loading "+process.env.ENV+" mode.");
var socketCluster = new SocketCluster({
	workers: numCPUs,
	brokers: 1,
	port: process.env.PORT || 3000,
	appName: 'sc_demos',
	workerController: __dirname + '/worker.js',
	brokerController: __dirname + '/broker.js',
	socketEventLimit: 100,
	rebootWorkerOnCrash: true,
	logLevel:2,
	protocol:'http'
});
