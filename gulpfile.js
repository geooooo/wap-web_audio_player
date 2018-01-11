var gulp = require('gulp');
var pug  = require('gulp-pug');
var scss = require('gulp-sass');
var ts   = require('gulp-typescript');

var PATHS = {
    scss: 'app/dev/**/*.scss',
    pug: [
          'app/dev/index.pug',
          'app/dev/**/*.pug'
    ],
    ts:   'app/dev/**/*.ts'
};


gulp.task('compile-pug', function () {
    return gulp.src(PATHS.pug)
               .pipe(pug({ pretty: true }))
               .pipe(gulp.dest(function (file) {
                   return file.base.replace(/dev$/, 'build');
                }));
});


gulp.task('compile-scss', function () {
    return gulp.src(PATHS.scss)
               .pipe(scss({ outputStyle: 'expanded' }))
               .pipe(gulp.dest(function (file) {
                   return file.base.replace(/dev$/, 'build');
                }));
});


gulp.task('compile-ts', function () {
    return gulp.src(PATHS.ts)
               .pipe(ts({
                   target: 'es5',
                   module: 'none',
                   pretty: true
               }))
               .pipe(gulp.dest(function (file) {
                   return file.base.replace(/dev$/, 'build');
               }));
});


gulp.task('compile', function () {
    gulp.watch(PATHS.pug,  gulp.series('compile-pug'));
    gulp.watch(PATHS.scss, gulp.series('compile-scss'));
    gulp.watch(PATHS.ts,   gulp.series('compile-ts'));
});
