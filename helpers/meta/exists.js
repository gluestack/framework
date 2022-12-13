const { map } = require('lodash');
const { warning, error } = require('../print');
const { readFile } = require('../file');

module.exports = async (servicePath, serviceName, folderName) => {
	let data = await readFile(servicePath);

	if (!data) {
		error('Meta file is corrupted. Missing configuration.');
		process.exit(0);
	}

	map(data, (service) => {
		if (service.directory === folderName) {
			warning(
				`Service "${serviceName}" already exist in your project in "${folderName}" directory`
			);
			process.exit(0);
		}
	});
};
