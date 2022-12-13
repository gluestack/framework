const { promises } = require('fs');

const appendFileContent = async (filepath, content) => {
	await promises.appendFile(filepath, content);
};

module.exports = { appendFileContent };
