global.path_root = __dirname;

var http = require("http");
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
		    	var p = $("body").html();

			console.log("done");
		} else {
		  	console.log("error");
		}
	    //html = $(html);
	    res.send({
	    	title:title,
	    	content:p
	    })
	})
}); 
router.get("/getBdlocation",function(req,res){
	zhua(res);
})
app.use(router);

function zhua(ress){
	 var url = "http://map.baidu.com/?qt=ipLocation&t="+new Date().getTime();
	 var option = {
        // host: proxy[proxyIndex].ip,
        // port: proxy[proxyIndex].port,
        method: 'GET',//这里是发送的方法
        path: url,
        header: {
            'Host': 'map.baidu.com',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            // 'Referer': url,
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cookie': 'BAIDUID=3369B33D282E8118172335BF6EFCBAD8:FG=1; BIDUPSID=3369B33D282E8118172335BF6EFCBAD8; PSTM=1481767855; BDUSS=VTcWIyNU9oeTExa2lGV01CLU9DblRtRDRaREFmQ0RVTzByLXJ4NTJqcnhNWmxaSVFBQUFBJCQAAAAAAAAAAAEAAAAudbsX0KFx08PBps6i0KYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPGkcVnxpHFZZm; BDSFRCVID=_G8sJeCCxG3r1jcZtsIwVls2qt_-JdjDIBG33J; H_BDCLCKID_SF=tR3fL-08tCt2hDtk-PnVeURDehbZKxJmMgkeQJ6kLfcqhU8RKjQR2t-00U5f25czfIQxhDOFfDLbbKL4jj-3-PAt-U4X5470M6TXsJOOaCvrsInRy4oTLnk1DpKDatJzbT7ALMQs-KoafMAzy4O8QMFYQN-eBjT2-DA_oKIbJCOP; MCITY=-%3A; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=1; H_PS_PSSID=23764_1463_21095_17001_22157; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598'
        }
    };
    //http.request(option, function (res) {//这里为使用代理IP,还有bug,暂时没有解决掉.
    http.get(url, function (res) {
    	var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function (){
        	ress.send(data);
        });
    });
}

module.exports = app;
