/**
 * Gulp file with build tasks
 */

/* Load Plugins */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    precompiler = require('gulp-precompile-handlebars'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    wrap = require('gulp-wrap'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util')
    rename = require('gulp-rename');


/* Define Tasks here */

//1. sass Task
gulp.task('sass', function () {
  return gulp.src('App/scss/**/*.scss')
    .pipe(sass())
    .pipe(cleanCss({compatibility: 'ie9'}))
    .pipe(gulp.dest('css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

//2. js Task
gulp.task('scripts', function () {
  return gulp.src('App/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('scripts'))
    .on('error', function(err){
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

//3. precompile handlebars Task
gulp.task('handlebars', function () {
  return gulp.src('Templates/*.hbs')
    .pipe(precompiler())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Cerdelga.templates', // Namespace it to the project so that it doesn't create confilct
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('scripts'))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    //.pipe(uglify())
    .pipe(gulp.dest('scripts'))
    .pipe(notify({
      message: 'Handlebars task complete'
    }));
});

//Watch Command
gulp.task('watch', function () {

  //Watch .scss files
  gulp.watch('App/scss/**/*.scss', ['sass']);

  //Watch .js files
  gulp.watch('App/js/**/*.js', ['scripts']);

  //Watch handlebar templates
  gulp.watch('Templates/*.hbs', ['handlebars']);

});

//Default Command 
gulp.task('default', ['sass', 'scripts', 'handlebars', 'watch']);