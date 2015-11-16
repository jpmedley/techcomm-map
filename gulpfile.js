var gulp = require('gulp');
var express = require('express');

var ROOT_DIR = 'app';

function runExpress(port, rootDir) {
  var app = express();

  app.use(express.static(rootDir));
  app.set('views', path.join(rootDir, 'views'));
  app.set('view engine', 'jade');

  app.get('/dynamic/:page', function(req, res) {
    res.render(req.params.page);
  });

  var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server running at http://%s:%s', host, port);
  });
}

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  swPrecache.write(path.join(ROOT_DIR, 'service-worker.js'), {
    staticFileGlobs: [ROOT_DIR + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: ROOT_DIR
  }, callback);
});

gulp.task('serve', ['generate-service-worker'], function() {
  runExpress(3000, ROOT_DIR)
});