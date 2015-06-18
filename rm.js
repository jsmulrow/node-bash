var fs = require('fs');

// done synchronously for simplicity (should be plenty fast enough);
var readInsides = function(path) {
	var files = fs.readdirSync(path);
	// if there are files in the directory
	if (files.length) {
		files.forEach(function(file) {
			// check if file is a directory
			if (!/\..+$/.test(file)) {
				// if so, run readInsides on its files
				var innerFiles = fs.readdirSync(path + '/' + file);
				if (innerFiles.length) {
					readInsides(path + '/' + file);
				}
				// then delete it once it's empty
				fs.rmdir(path + '/' + file);
			} else {
				// if not, delete the file
				fs.unlinkSync(path + '/' + file);
			}
		});
	}
};

var remove = function(path, name, option) {
	// check for recursive option
	if (option && option.indexOf('rf') !== -1) {
		path = path + '/' + name;
		// check inside the folder
		readInsides(path);
		// delete the empty remaining folder with fs.rmdir(path, callback(e))
		fs.rmdir(path);
	} else {
		fs.unlink(path + '/' + name, function(e) {
			if (e) throw e;
		});
	}
};

module.exports = remove;