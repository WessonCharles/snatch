global.path_root = __dirname;

var express = require('express');
var $ = require(path_root+"/jquery/jq").jq();
// var exec = require('child_process').exec; 

var debug = require("debug")("node_snatch");
var app = express();

app.use(function (req, res,next) {
    next();
});
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
router.get("/getSnatchContent",function(req,res){
	var reqUrl = req.param("url");
	/***执行系统脚本实现方式***/
	// var cmdStr = 'curl '+reqUrl;
	// exec(cmdStr, function(err,stdout,stderr){
	//     if(err) {
	//         console.log('get weather api error:'+stderr);
	//     } else {
	//         var data = JSON.parse(stdout);
	//         console.log(data);
	//     }
	// });
	/**
	 * jquery实现方法
	 */
	$.get(reqUrl, "gbk", function(html) {
	    var title = html.find("title").text();
	    var img = html.find("img:first").attr("src");
	    var p = html.find("p:first").text().Substring(0,50);
	    res.send({
	    	title:title,
	    	img:img,
	    	content:p
	    })
	})
}); 

module.exports = app;