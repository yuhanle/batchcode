const express = require('express');
var router = require('./routes/index.js');
var jokelist = require('./tools/jokelist');
var batch = require('./tools/batch');

const app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
})

app.use('/', express.static(__dirname + '/static'));
router(app);

app.listen(3000);
console.log('app started at port 3000...');

// 启动抓图服务
jokelist.start();

// 启动注册服务 -> 服务由Web 端控制
// var batcher = batch.singleton().getInstance();
// batcher.start();