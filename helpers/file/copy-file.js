const fs = require('fs');
const path = require('path');
const { fileExists } = require('./file-exists');

const copyFile = async (source, target) => {
	let targetFile = target;

	// If target is a directory, a new file with the same name will be created
	if (fileExists(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			targetFile = path.join(target, path.basename(source));
		}
	}

	await fs.writeFileSync(targetFile, fs.readFileSync(source));
};

module.exports = { copyFile };
