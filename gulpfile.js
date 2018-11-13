'use strict';

var gulp = require( "gulp" ),
    sass = require( "gulp-sass" )

// Compile and concatenate all .scss files to .css
gulp.task( "sass", function() {
  return gulp.src( './static/css/scss/**/*.scss' )
      .pipe( sass.sync().on( 'error', sass.logError ) )
      .pipe( gulp.dest( './static/css' ) ); } );
    

// Watch for changes of the scss files
gulp.task( "watch", ["sass"],  function() {
  gulp.watch( "static/css/scss/**/*.scss", [ "sass" ] ) } );

// Set the default task
gulp.task( "default", [ "watch" ] );
