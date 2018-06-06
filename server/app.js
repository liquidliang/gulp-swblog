'use strict';

const path = require('path');
const koa = require('koa');
const koaStatic = require('koa-static');
const onError = require('koa-onerror');

const app = new koa();
onError(app);

//////////////
// 业务逻辑 //
//////////////

// 静态目录
let staticPath = path.resolve(__dirname, '../');
console.info('static path:', staticPath);
app.use(koaStatic(staticPath));

const getServer = (port) => {
  let server = app.listen(port, 'localhost', ()=>{
    console.log('Koa server listening on localhost:%d', server.address().port);
  });
  return server;
};

if(module.parent){
  module.exports = getServer;
}else{
  getServer(8082);
}
