var fs = require('fs');

var printDir = function(path, callback) {
	fs.readdir(path, function(e, files) {
		if (e) throw e;
		// remove hidden files
		files = files.filter(function(file) {return file[0] !== '.';});
		// join the files
		files = files.join('   ');
		callback(files);
	});
};

module.exports = printDir;