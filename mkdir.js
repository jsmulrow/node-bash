var fs = require('fs');

var makeDir = function(path, name) {
	fs.mkdir(path + '/' + name, function(e) {
		if (e) throw e;
	});
};

module.exports = makeDir;