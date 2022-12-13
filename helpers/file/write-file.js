const { promises } = require('fs');
const { error } = require('../print');

const writeFile = async (path, content = '') => {
	try {
		await promises.writeFile(path, content);
	} catch (err) {
		error('Writing file failed: ' + err.message);
	}

	return Promise.resolve(true);
};

module.exports = { writeFile };
