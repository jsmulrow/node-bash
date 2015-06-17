var fs = require('fs');

var printDir = function(path, option) {
	// check for color option
	var color;
	if (option && option.indexOf('color') !== -1) {
		var chalk = require('chalk');
		color = option.replace('--color=', '');
	}

	fs.readdir(path, function(e, files) {
		if (e) throw e;
		// remove hidden files
		files = files.filter(function(file) {return file[0] !== '.';});
		// join the files
		files = files.join('   ');
		if (color) {
			if (color === 'blue') console.log(chalk.blue(files)); 
			else if (color === 'red') console.log(chalk.red(files));
		}
		console.log(files);
	});
};

module.exports = printDir;