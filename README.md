# snatch
一个根据链接地址抓取标题数据，内容和图片并响应的示例

__支持http和https__

#请求方式
<small>angular代码示例</small>

```javascript
  var originUrl = "http://snatch.chqiangs.com";
  var reg = "http://www.baidu.com";//要抓取的地址
  $http.get(testUrl+"/getSnatchContent?url="+reg).success(function(data){
      var html = $(data.content);//body中的内容
      scope.title = data.title;//链接的标题
      var imgs = [];
      //以下是获取图片和主要内容的处理
      for(var i in html){
        if(html[i].nodeName=="DIV"){
          scope.conHtml = $(html[i].innerHTML);
          //content:主要内容
          scope.content = scope.conHtml.find("p").text().replace(/\s/g,"").substring(0,49)+"...";

          scope.conHtml.find("img").each(function(){
            if($(this).attr("src")||$(this).attr("data-src")){
              imgs.push($(this).attr("src")||$(this).attr("data-src"));
            }
          });
          //img:第一张图片
          scope.img = imgs[0];
          break;
        }
      }
    })
  
```
