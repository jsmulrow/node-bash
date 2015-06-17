// store command name from process.argv
var commandName = process.argv[2];

// check for provided option
var option = process.argv[process.argv.length - 1];
if (option && option.indexOf('--') === -1) {
	option = undefined;
}

// print working directory
if (commandName === 'pwd') {
	var PWD = require('./pwd');
	PWD(process);
}

else if (commandName === 'ls') {
	var LS = require('./ls');
	var path = process.env.PWD;
	LS(path, option);
}

else if (commandName === 'mkdir') {
	var MKDIR = require('./mkdir');
	var dirName = process.argv[3];
	MKDIR(process.env.PWD, dirName);
}

else if (commandName === 'cat') {
	var CAT = require('./cat');
	var files = process.argv.slice(3);
	CAT(files);
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
	RM(path, fileName);
}

else if (commandName === 'mv') {
	var CP = require('./cp');
	var RM = require('./rm');
	var path = process.env.PWD;
	var oldName = process.argv[3];
	var newName = process.argv[4];
	CP(path, oldName, newName, CP, RM);
}