var gulp = require( "gulp" ),
    sass = require( "gulp-sass" ),
    cleanCSS = require( "gulp-clean-css" ),
    concatCSS = require( "gulp-concat-css" ),
    autoprefixer = require( "gulp-autoprefixer" )

// Compile and concatenate all .scss files to .css
gulp.task( "scss", function() {
  gulp.src( "static/styles/scss/*.scss" )
      .pipe( sass( { outputStyle: "compressed" } ) )
      .pipe( cleanCSS() )
      .pipe( autoprefixer( "last 10 versions" ) )
      .pipe( concatCSS( "custom.css" ) )
      .pipe( gulp.dest( "static/styles" ) ) } );

// Compile the changes that occure in the scss folder of the theme and
// insert them in the static/styles folder of this repository
gulp.task( "scss-theme", function() {
  gulp.src( "themes/osprey/static/styles/scss/*.scss" )
      .pipe( sass( { outputStyle: "compressed" } ) )
      .pipe( cleanCSS() )
      .pipe( autoprefixer( "last 10 versions" ) )
      .pipe( concatCSS( "main.css" ) )
      .pipe( gulp.dest( "static/styles" ) ) } );

// Watch for changes of the scss files
gulp.task( "watch", [ "scss" ], function() {
  gulp.watch( "static/styles/scss/*", [ "scss" ] ) } );

// Set the default task
gulp.task( "default", [ "watch" ] );
