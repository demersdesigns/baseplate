var gulp = require('gulp'),
	expect = require('chai').expect,
	minifyHTML = require('../'),
	Minimize = require('minimize'),
	es = require('event-stream'),
	path = require('path'),
	fs = require('fs');

require('mocha');

describe('gulp-minify-html minification', function() {
	var filename = path.join(__dirname, './fixture/index.html');
	it('should minify my files', function(done) {
		gulp.file(filename)
		.pipe(minifyHTML())
		.pipe(es.map(function(file){
			var source = fs.readFileSync(filename),
				minimize = new Minimize();
				
			minimize.parse(source.toString(), function (err, data) {
				if (err) throw err;
				var expected = data;
				expect(expected).to.be.equal(file.contents.toString());
				done();
			});
		}));
	});

	it('should return file.contents as a buffer', function(done) {
		gulp.file(filename)
		.pipe(minifyHTML())
		.pipe(es.map(function(file) {
			expect(file.contents).to.be.an.instanceof(Buffer);
			done();
		}));
	});
});