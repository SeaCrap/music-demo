var http = require('http')
var fs = require('fs')
var url = require('url')
var qiniu = require('qiniu')

var port = process.env.PORT || 8888; //bash设置端口,比如：PORT=8001 node server.js,这样就可以开启一个 8001 的端口

var server = http.createServer(function(request, response){
  
  var temp = url.parse(request.url,true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/


   if(path==='/uptoken'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', '*')
    
    var config = fs.readFileSync('./qiniu-key.json')
    config = JSON.parse(config) 
    
    let {accessKey,secretKey} = config
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
      scope: 'music-demo',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    response.write(`
    {
     "uptoken": "${uploadToken }" 
    }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end()
  }
  
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
