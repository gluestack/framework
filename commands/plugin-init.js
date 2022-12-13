/**
 * Installs the project or plugin
 */

const pluginInit = require('../actions/plugin-init');

module.exports = async (program) => {
	program
		.command('plugin-init')
		.description('Initializes the gluestack app as a plugin')
		.action(pluginInit);
};
