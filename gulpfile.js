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
    gutil = require('gulp-util'),
    streamqueue = require('streamqueue'),
    rename = require('gulp-rename');


/* Define Tasks here */

//1. sass Task
gulp.task('sass', function () {
  return gulp.src('src/App/scss/**/*.scss')
    .pipe(sass())
    .pipe(cleanCss({compatibility: 'ie9'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

//2. precompile handlebars Task
gulp.task('handlebars', function () {
  return gulp.src('src/Templates/*.hbs')
    .pipe(precompiler())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Cerdelga.templates', // Namespace it to the project so that it doesn't create confilct
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('src/App/templates'))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('src/App/templates'))
    .pipe(notify({
      message: 'Handlebars task complete'
    }));
});

//3. js Task
gulp.task('scripts', function () {
  return streamqueue({objectMode: true},
        /* External Libraries  */
        gulp.src('src/App/js/vendor/jquery.min.js'),
        gulp.src('src/App/js/vendor/jquery.validate.min.js'),
        gulp.src('src/App/js/vendor/jquery.cookie.js'),
        gulp.src('src/App/js/vendor/modernizr.js'),
        gulp.src('src/App/js/vendor/handlebars.runtime.js'),
        /* App Specific Modules */
        gulp.src('src/App/js/modules/**/*.js'),
        /* App Templates */
        gulp.src('src/App/templates/templates.js')
      )
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts'))
    .on('error', function(err){
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

//4. Fonts Task
gulp.task('fonts', function() {
  return gulp.src('src/App/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

//5. HTML Task
gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist/'))
});

//6. Viewer Task - This is for PDF Viewer
gulp.task('viewer', function() {
  return gulp.src('src/viewer/**/*')
  .pipe(gulp.dest('dist/viewer'))
});

//7. Favicon Task
gulp.task('favicon', function(){
  return gulp.src('src/favicon/**/*')
        .pipe(gulp.dest('dist/favicon'))
});

//8. Assets Task
gulp.task('assets', function(){
    return gulp.src('src/assets/**/*')
          .pipe(gulp.dest('dist/assets'))
          
});

//9. Images Task
gulp.task('images', function(){
   return gulp.src('src/images/**/*')
          .pipe(gulp.dest('dist/images'))
});

//10. PDF Viewer Task
gulp.task('pdf', function(){
  return gulp.src('src/App/js/modules/pdf.worker.js')
          .pipe(gulp.dest('dist/viewer/'))
});

//11. Email Templates
gulp.task('email', function(){
  return gulp.src('src/EmailTemplates/**/*')
        .pipe(gulp.dest('dist/EmailTemplates'))
});

//Watch Command
gulp.task('watch', function () {

  //Watch .scss files
  gulp.watch('src/App/scss/**/*.scss', ['sass']);

  //Watch .js files
  gulp.watch('src/App/js/**/*.js', ['scripts']);

  //Watch handlebar templates
  gulp.watch('src/Templates/*.hbs', ['handlebars']);

  //Watch Fonts Task
  gulp.watch('src/App/fonts/**/*', ['fonts']);

  //Watch HTML Task
  gulp.watch('src/**/*.html', ['html']);

  //Watch Viewer Task - This is for PDF Viewer
  gulp.watch('src/viewer/**/*', ['viewer']);

  //Watch Favicon Task
  gulp.watch('src/favicon/**/*', ['favicon']);

  //Watch Assets Task
  gulp.watch('src/assets/**/*', ['assets']);

  //Watch Images Task
  gulp.watch('src/images/**/*', ['images']);

  //PDF Watcher Task
  gulp.watch('src/App/js/modules/pdf.worker.js', ['pdf']);

  //Email Template Task
  gulp.watch('src/EmailTemplates/**/*', ['email']);

});

//Default Command 
gulp.task('default', ['sass', 'scripts', 'handlebars', 'fonts', 'html', 'viewer', 'favicon', 'assets', 'images', 'pdf', 'email',  'watch']);