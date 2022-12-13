const { appendFileContent } = require('./append-file-content');
const { createFolder } = require('./create-folder');
const { copyFile } = require('./copy-file');
const { copyFolder } = require('./copy-folder');
const { fileExists } = require('./file-exists');
const { writeFile } = require('./write-file');
const { readFile } = require('./read-file');
const { rm } = require('./rm');

module.exports = {
	createFolder,
	copyFile,
	copyFolder,
	fileExists,
	readFile,
	writeFile,
	appendFileContent,
	rm,
};
