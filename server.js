var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

/******** 从这里开始看，上面不要看 ************/
  if(path === '/uptoken'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    //CORS跨域方案：告诉浏览器不要阻止 http://mrli.com:8801
    response.setHeader('Access-Control-Allow-Origin', '*')
   
    var json = fs.readFileSync('./qiniu-key.json')
    var accessKey = 'your access key';
    var secretKey = 'your secret key';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    response.write(`
    {
       "uptoke": "${}"   
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
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

