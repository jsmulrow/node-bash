var fs = require('fs');

var remove = function(path, name) {
	fs.unlink(path + '/' + name, function(e) {
		if (e) throw e;
	});
};

module.exports = remove;