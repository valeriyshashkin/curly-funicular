const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('js', function(done) {
    gulp.src('./dist/curly-funicular.js')
        .pipe(uglify({
            output: {
                comments: 'license'
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
    done();
});

gulp.task('default', gulp.series('js'));