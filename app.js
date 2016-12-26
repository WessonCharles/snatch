global.path_root = __dirname;

var express = require('express');
var cheerio = require("cheerio");
var server = require(path_root+"/jquery/jq").jq();
// var exec = require('child_process').exec; 

var debug = require("debug")("node_snatch");
var app = express();

app.use(function (req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
router.get("/getSnatchContent",function(req,res){
	var reqUrl = req.query.url;
	server.get(reqUrl, function(data) {
		if (data) {
			var $ = cheerio.load(data);
			var title = $("title").text();
		    var img = $("img:first").attr("src");
		    var p = $("p:first").text().Substring(0,50);

			console.log("done");
		} else {
		  	console.log("error");
		}
	    //html = $(html);
	    res.send({
	    	title:title,
	    	img:img,
	    	content:content
	    })
	})
}); 
app.use(router);
module.exports = app;
