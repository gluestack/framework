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
			if (pluginInstance.instance === folderName) {
				warning(
					`Plugin "${pluginName}" already exist in your project as "${folderName}" instance`
				);
				process.exit(0);
			}
		});
	}
};
