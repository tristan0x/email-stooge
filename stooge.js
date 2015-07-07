var fs = require('fs');
var path = require('path');

var mkdirp = require('mkdirp');
var glob = require('glob');
var juice = require('juice');
var htmlToText = require('html-to-text');
var minify = require('html-minifier').minify;

module.exports = function(options) {

  var distDir = options.distDir || 'dist';
  var srcDir = options.sourceDir || 'templates';
  var filesPattern = options.filesPattern || '*.html';

  var prepare = function() {
    mkdirp.sync(distDir);

    glob(path.join(srcDir, filesPattern), function(err, files) {
      if (err) { throw err; }

      if (files.length === 0) {
        console.log('There were no files to prepare, exiting.');
        process.exit();
      }

      files.forEach(function(srcFilepath) {
        var filename = path.basename(srcFilepath);
        var destMinifiedFilename = filename.replace('.html', '.min.html');
        var destTextFilename = filename.replace('.html', '.txt');

        destMinifiedFilename = path.join(distDir, destMinifiedFilename);
        destTextFilename = path.join(distDir, destTextFilename);

        fs.readFile(srcFilepath, 'utf-8', function(err, data) {
          if (err) { throw err; }

          var juiced = juice(data);

          var minified = minify(juiced, {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeEmptyAttributes: true,
            minifyCss: true
          });
          var textified = htmlToText.fromString(minified, {
            wordwrap: 70,
            ignoreImage: true
          });

          fs.writeFile(destMinifiedFilename, minified, function(err) {
            if (err) { throw err; }
            console.log(destMinifiedFilename + ' saved (min)');
          });

          fs.writeFile(destTextFilename, textified, function(err) {
            if (err) { throw err; }
            console.log(destTextFilename + ' saved (txt)');
          });
        });
      });
    });
  }

  return {
    prepare: prepare
  }
}
