/**
 * Installs the project or plugin
 */

const pluginVersion = require('../actions/plugin-version');

module.exports = async (program, app) => {
	program
		.command('plugin:version')
		.description('Prints the current version of the plugin')
		.action(() => {
			pluginVersion(app);
		})
};
