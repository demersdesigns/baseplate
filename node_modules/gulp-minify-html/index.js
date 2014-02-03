var es = require('event-stream'),
	Minimize = require('minimize'),
  clone = require('clone');

module.exports = function(opt){
  if (!opt) opt = {};
  var minimize = new Minimize(opt);

  function modifyContents(file, cb){
    var newFile = clone(file);

    minimize.parse(String(newFile.contents), function (error, data) {
      if (error) throw error;
      var newContents = data;
      newFile.contents = new Buffer(newContents);
      cb(null, newFile);
    });
  }
  return es.map(modifyContents);
}