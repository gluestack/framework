const { map } = require('lodash');
const { warning, error } = require('../print');
const { readFile } = require('../file');

module.exports = async (pluginPath, pluginName, folderName) => {
	let data = await readFile(pluginPath);

	if (!data) {
		error('Meta file is corrupted. Missing configuration.');
		process.exit(0);
	}

	if (data[pluginName]) {
		map(data[pluginName], (pluginInstance) => {
			if (pluginInstance.directory === folderName) {
				warning(
					`Service "${pluginName}" already exist in your project in "${folderName}" directory`
				);
				process.exit(0);
			}
		});
	}
};
