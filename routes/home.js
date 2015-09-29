var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var parseUrlencoded = bodyParser.urlencoded({ extended:false });

// Session Middleware
router.use(function(req,res,next) {

  	next();
});

// Basic Route
router.route("/")
	.get(function(req,res) {
	    res.render("index", {
	      title: "Home Page",
	      user: {
	      	first: 'Nick',
	      	last: 'Kotenberg'
	      }
	    });
	});

module.exports = router;