var fs = require('fs');
var async = require('async');

var concatenateFiles = function(files, callback) {
	async.reduce(files, [], function(memo, file, next) {
		fs.readFile(file, function(e, data) {
			if (e) throw e;
			memo.push(data.toString());
			return next(null, memo);
		});
	}, function(e, result) {
		if (e) throw e;
		// remove trailing newline character
		callback(result.join('').slice(0,-1));
	});
};

module.exports = concatenateFiles;