// store command name from process.argv
var commandName = process.argv[2];

// check for provided option, if multiple, take the first one - for now
var option = process.argv.filter(function(elem) {
	return (/^-/).test(elem);
})[0];

var redirect;
for (var i = 0; i < process.argv.length; i++) {
	if (process.argv[i] === '>') {
		redirect = process.argv[i+1];
		break;
	}
}

// remove option from process.argv
process.argv = process.argv.filter(function(elem) {
	return elem !== option && elem !== '>' && elem !== redirect;
});

// vanilla callback console logs the output
var callback = function(output) {
	return console.log(output);
};

// check for option, and update callback function accordingly
if (option) {
	var color;
	if (option && option.indexOf('color') !== -1) {
		var chalk = require('chalk');
		color = option.replace('--color=', '');
	}
	if (color) {
		if (color === 'blue') {
			callback = function(output) {
				return console.log(chalk.blue(output));
			};
		} else if (color === 'red') {
			callback = function(output) {
				return console.log(chalk.red(output));
			};
		}
	}
}

// if redirect option, update the callback
if (redirect) {
	var fs = require('fs');
	var path = process.env.PWD + '/' + redirect;
	callback = function(output) {
		console.log(path);
		fs.writeFile(path, output, function(e) {
			if (e) throw e;
		});
	};
}

// print working directory
if (commandName === 'pwd') {
	var PWD = require('./pwd');
	PWD(process, callback);
}

else if (commandName === 'ls') {
	var LS = require('./ls');
	var path = process.env.PWD;
	LS(path, callback);
}

else if (commandName === 'mkdir') {
	var MKDIR = require('./mkdir');
	var dirName = process.argv[3];
	MKDIR(process.env.PWD, dirName);
}

else if (commandName === 'cat') {
	var CAT = require('./cat');
	var files = process.argv.slice(3);
	CAT(files, callback);
}

else if (commandName === 'cp') {
	var CP = require('./cp');
	var path = process.env.PWD;
	var oldFile = process.argv[3];
	var newFile = process.argv[4];
	CP(path, oldName, newName);
}

else if (commandName === 'rm') {
	var RM = require('./rm');
	var fileName = process.argv[3];
	var path = process.env.PWD;
	RM(path, fileName, option);
}

else if (commandName === 'mv') {
	var CP = require('./cp');
	var RM = require('./rm');
	var path = process.env.PWD;
	var oldName = process.argv[3];
	var newName = process.argv[4];
	CP(path, oldName, newName, CP, RM);
}