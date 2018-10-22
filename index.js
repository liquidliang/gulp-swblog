'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copy = require('copy');
const indexerPlugin = require('gulp-markdown-index');
const packJSON = require('./package.json');


module.exports = function (directoryName, options) {

  // console.log(packJSON.version);
  let needInit = true;
  let versionPath = path.resolve(directoryName, './version');
  try{
    let version = fs.readFileSync(versionPath, 'utf8');
    if (version == packJSON.version){
      needInit = false;
    }
  }catch(e){}
  if(needInit){
    console.log('needInit')
    copy(__dirname + '/source/lib/**/*.*'.replace(/\//g, path.sep), path.resolve(directoryName, './lib'), function (err, file) {
      if (err) throw err;
    });

    copy(__dirname + '/source/dist/*.min.js'.replace(/\//g, path.sep), path.resolve(directoryName, './dist'), function (err, file) {
      if (err) throw err;
    });

    copy(__dirname + '/source/*.html'.replace(/\//g, path.sep), path.resolve(directoryName, './'), function (err, file) {
      if (err) throw err;
    });

    copy(__dirname + './*.ico'.replace(/\//g, path.sep), path.resolve(directoryName, './'), function (err, file) {
      if (err) throw err;
    });

    mkdirp(path.resolve(directoryName, './json/'), function (err) {
      if (err) console.error(err);
    });
    fs.writeFileSync(versionPath, packJSON.version, {
      encoding: 'utf8'
    });
  }


  fs.writeFileSync(path.resolve(directoryName, './json/config.json'), JSON.stringify(options, null, 2), {
    encoding: 'utf8'
  });

  let indexer = indexerPlugin(path.resolve(directoryName, './json/article.json'), options.staticDir);

  // indexer.on('data', function (file) {
  //   let list = JSON.parse(''+file.contents);
  //   console.log(arguments);
  // })

  return indexer;
};
