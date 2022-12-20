const { map } = require('lodash');
const { warning, error } = require('../print');
const { readFile } = require('../file');

module.exports = async (pluginPath, pluginName, instanceName) => {
	let data = await readFile(pluginPath);

	if (!data) {
		error('Meta file is corrupted. Missing configuration.');
		process.exit(0);
	}
	//Todo::check if instance name is unique

	for (const pluginName of Object.keys(data)) {
		map(data[pluginName], (pluginInstance) => {
			if (pluginInstance.instance === instanceName) {
				error(
					`"${instanceName}" instance already added from plugin "${pluginName}"`
				);
				process.exit(0);
			}
		});
	}
};
