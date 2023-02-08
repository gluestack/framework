/**
 * Installs the project or plugin
 */

const installedPluginList = require('../actions/installed-plugin-list');

module.exports = async (program, app) => {
	const command = program
		.command('instance:list')
		.description('Prints the list of installed plugin instances')
		.action(() => {
			installedPluginList(app);
		});
};
