'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copy = require('copy');
const template = require('lodash.template');
const indexerPlugin = require('gulp-markdown-index');


module.exports = function (directoryName, options) {

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

  fs.writeFileSync(path.resolve(directoryName, './json/config.json'), JSON.stringify(options, null, 2));


  return indexerPlugin(path.resolve(directoryName, './json/article.json'), options.staticDir);
};
