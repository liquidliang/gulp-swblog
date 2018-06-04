# gulp-swblog
> Create a swblog in your static directory for gulp

## Usage

First, install `gulp-swblog` as a development dependency:

```shell
npm install --save-dev gulp-swblog
```

Then, add it to your `gulpfile.js`:

### Simple
```javascript
var swblog = require('gulp-swblog');

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
```
