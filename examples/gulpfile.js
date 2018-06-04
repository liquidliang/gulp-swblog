var gulp = require('gulp');
/** REMOVE ME **/ var swblog = require('../');
/** USE ME **/ // var replace = require('gulp-markdown-index');

gulp.task('swblog', function() {
  return gulp.src('../blog/**/*.md', { base : './' } )
    .pipe(swblog('./swblog', {
      "author": "liquidliang",
      "logoTitle": "swblog博客系统",
      "nav": [
        ["Home", "#!/blog/readme.md"],
        ["About", "#!/blog/about.md"],
        ["Document", "#!/blog%2Fdocument"]
      ]
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['swblog']);
