var gulp = require( "gulp" ),
    sass = require( "gulp-sass" ),
    cleanCSS = require( "gulp-clean-css" ),
    concatCSS = require( "gulp-concat-css" ),
    autoprefixer = require( "gulp-autoprefixer" )

// Compile and concatenate all .scss files to .css
gulp.task( "scss", function() {
  gulp.src( "static/css/scss/*.scss" )
      .pipe( sass( { outputStyle: "compressed" } ) )
      .pipe( cleanCSS() )
      .pipe( autoprefixer( "last 10 versions" ) )
      .pipe( concatCSS( "custom.css" ) )
      .pipe( gulp.dest( "static/css" ) ) } );

// Watch for changes of the scss files
gulp.task( "watch", [ "scss" ], function() {
  gulp.watch( "static/css/scss/*", [ "scss" ] ) } );

// Set the default task
gulp.task( "default", [ "watch" ] );
