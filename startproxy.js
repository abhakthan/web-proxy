var gulp = require('gulp');

var url = require('url');
var proxy = require('proxy-middleware');
var browserSync = require('browser-sync');

// browser-sync task for starting the server.
gulp.task('default', function() {
  var proxyOptions = url.parse('https://dev.privacynow.com/core');
  proxyOptions.route = '/core';

  browserSync({
    ui: false,
    files: [ './src/**/*.*' ],
    open: true,
    port: 3000,
    server: {
      baseDir: "./src/",
      middleware: [proxy(proxyOptions)]
    }
  });
});