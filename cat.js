var fs = require('fs');
var async = require('async');

var concatenateFiles = function(files) {
	async.reduce(files, [], function(memo, file, callback) {
		fs.readFile(file, function(e, data) {
			if (e) throw e;
			memo.push(data.toString());
			return callback(null, memo);
		});
	}, function(e, result) {
		if (e) throw e;
		// remove trailing newline character
		console.log(result.join('').slice(0,-1));
	});
};

module.exports = concatenateFiles;