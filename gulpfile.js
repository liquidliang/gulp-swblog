const gulp = require('gulp');
const less = require('gulp-less');
const cssClean = require('gulp-clean-css');
const open = require('gulp-open');
const plumber = require('gulp-plumber');
const indexer = require('gulp-markdown-index');
const fs = require('fs');
const path = require('path');
const updateJSON = require('./server/update-index.js');
const os = require('os');
const webpack = require('webpack-stream');
const webpackConfig = require('./source/webpack.config.js');
const getServer = require('./server/app');
const browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));

const articleJson = './json/article.json';

//产生文章列表的接口文件
gulp.task('gen', function() {
  updateJSON();
});

// 生成索引
gulp.task('index', function () {
  return gulp.src('./blog/**/*.md')
    .pipe(indexer('./test.json'))
    .pipe(gulp.dest('./'));
});

//生成定制主题
gulp.task('less', function () {
  return gulp.src('./source/less/custom.bootstrap.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  })).pipe(cssClean())
  .pipe(gulp.dest('./source/lib/bootstrap-custom/css'));
});

//本地服务
gulp.task('server', function() {
  let port = 8083;
  getServer(port);
  let options = {
    uri: 'http://localhost:' + port,
    app: browser
  };
  gulp.src(__filename)
    .pipe(open(options));
});

//前端开发构建
gulp.task('dev', function() {
  return gulp.src(__filename)
    .pipe(plumber())
    .pipe(webpack(webpackConfig('dev')))
    .pipe(gulp.dest('source/dist/'));
});

//前端开发构建
gulp.task('build', function () {
  return gulp.src(__filename)
    .pipe(plumber())
    .pipe(webpack(webpackConfig('build')))
    .pipe(gulp.dest('source/dist/'));
});


gulp.task('watch', function() {
  gulp.series('dev', 'server').apply(this, arguments);
  gulp.watch(['source/src/**/*.js', 'source/src/**/*.css'], gulp.series('dev'));
  gulp.watch(['blog/**/**.md'], gulp.series('gen'));
  gulp.watch(['source/less/**/**.less'], gulp.series('less'));
});
