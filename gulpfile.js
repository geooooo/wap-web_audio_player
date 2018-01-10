var gulp  = require('gulp');
var pug   = require('gulp-pug');
var scss  = require('gulp-sass');
var ts    = require('gulp-typescript');
var babel = require('gulp-babel');


gulp.task('compile-pug', function () {
    return gulp.src('app/**/*.pug')
               .pipe(pug())
               .pipe(gulp.dest(function (file) {
                   return file.base;
               }));
});


gulp.task('compile-scss', function () {
    return gulp.src('app/**/*.scss')
               .pipe(scss()/*.on('error', function(){console.log("bad...");})*/)
               .pipe(gulp.dest(function (file) {
                   return file.base;
               }));
});


gulp.task('compile-ts', function () {
    return gulp.src('app/**/*.ts')
               .pipe(ts({
                   target: 'es6'
               }))
               .pipe(gulp.dest(function (file) {
                   return file.base;
               }));
});


gulp.task('compile-babel', function () {
    return gulp.src('app/**/*.js')
               .pipe(babel({
                    presets: ['env']
               }))
               .pipe(gulp.dest(function (file) {
                   return file.base;
               }));
});


gulp.task('compile', function () {
    gulp.watch('app/**/*.pug',  gulp.series('compile-pug'));
    //gulp.watch('app/**/*.scss', gulp.series('compile-scss'));
    gulp.watch('app/**/*.ts',   gulp.series('compile-ts'));
    gulp.watch('app/**/*.js',   gulp.series('compile-babel'));
});
