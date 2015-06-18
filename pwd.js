var printPWD = function(process, callback) {
	callback(process.env.PWD);
};

module.exports = printPWD;