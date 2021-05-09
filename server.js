let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let server = http.createServer(function(request, response){
  let parsedUrl = url.parse(request.url, true)
  let pathWithQuery = request.url 
  let queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  let path = parsedUrl.pathname
  let query = parsedUrl.query
  let method = request.method

  /******** 从这里开始看，上面可以忽略 ************/

  console.log('有请求发送过来啦！路径（带查询参数）为：' + pathWithQuery)
  response.statusCode=200
  // 默认首页
  const filePath=path==='/'?'/index.html':path
  const index=filePath.indexOf('.')
  // suffix 是后缀
  const suffix=filePath.substring(index)
  const fileTypes={
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png',
    '.jpg':'image/jpeg'
  }
  response.setHeader('Content-Type',`${fileTypes[suffix]||'text/html'};charset=utf-8`)
  let content
  try{
    content= fs.readFileSync(`./public${filePath}`)
  }catch(error){
    content="404——抱歉，请求内容不存在"
    response.statusCode=404
  }
  
  response.write(content)
  response.end()
 
  /******** 主要代码结束 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在ctrl+鼠标单击打开 http://localhost:' + port)