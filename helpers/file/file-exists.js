const fs = require('fs');

const fileExists = (filePath) =>
	fs.existsSync(filePath) ? true : false;

module.exports = { fileExists };
