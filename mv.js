var move = function(path, oldFile, newFile, cp, rm) {
	cp(path, oldFile, newFile);
	rm(path, oldFile);
};

module.exports = move;