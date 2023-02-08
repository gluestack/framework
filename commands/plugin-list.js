/**
 * Installs the project or plugin
 */

const pluginList = require('../actions/plugin-list');

module.exports = async (program, app) => {
	const command = program
		.command('plugin:list')
		.description('Prints the list of available plugins')
		.action(pluginList);
};
