var fs = require('fs');

var printDir = function(path) {
	fs.readdir(path, function(e, files) {
		if (e) throw e;
		// remove hidden files
		files = files.filter(function(file) {return file[0] !== '.';});
		console.log(files.join('   '));
	});
};

module.exports = printDir;