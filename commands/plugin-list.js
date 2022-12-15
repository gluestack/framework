/**
 * Installs the project or plugin
 */

const pluginList = require('../actions/plugin-list');
const installedPluginList = require('../actions/installed-plugin-list');

module.exports = async (program) => {
	const command = program
		.command('plugin-list')
		.description('Prints the list of plugins');

	command
		.command('available')
		.description('Prints the list of available plugins')
		.action(pluginList);
	command
		.command('installed')
		.description('Prints the list of installed plugins')
		.action(installedPluginList);
};
