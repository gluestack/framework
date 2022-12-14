/**
 * Installs the project or plugin
 */

const pluginVersion = require('../actions/plugin-list');

module.exports = async (program) => {
	program
		.command('plugin-list')
		.description('Prints the list of available plugins')
		.action(pluginVersion);
};
