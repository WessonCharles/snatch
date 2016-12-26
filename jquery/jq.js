module.exports.jq = function(){
    var http = require("http");
    var https = require("https");
  
    function download(url, callback) {
      var http = url.indexOf("https")==-1?http:https;
      http.get(url, function(res) {
        var data = "";
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on("end", function() {
          callback(data);
        });
      }).on("error", function() {
        callback(null);
      });
    }
    return {get:download};
 
};
