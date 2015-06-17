var fs = require('fs');

var copy = function(path, oldName, newName) {
	fs.link(path + '/' + oldName, path + '/' + newName, function(e) {
		if (e) throw e;
	});
};

module.exports = copy;