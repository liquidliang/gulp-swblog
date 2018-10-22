var gulp = require('gulp');
var mtimerPlugin = require('gulp-git-mtime');
/** REMOVE ME **/ var swblog = require('../');
/** USE ME **/ // var swblog = require('gulp-swblog');

gulp.task('swblog', function() {
  return gulp.src('../blog/**/*.md', { base : './' } )
    .pipe(mtimerPlugin())
    .pipe(swblog('./swblog', {
      "author": "liquidliang",
      "logoTitle": "swblog博客系统",
      "nav": [
        ["Home", "#!/blog/readme.md"],
        ["About", "#!/blog/about.md"],
        ["Document", "#!/blog%2F%E6%96%87%E6%A1%A3"]
      ]
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.parallel('swblog'));
