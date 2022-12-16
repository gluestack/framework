/**
 * Installs the project or plugin
 */

const { Argument } = require('commander');
const install = require('../actions/install');

module.exports = async (program, app) => {
	// install group command
	const command = program
		.command('install')
		.description(
			'installs a gluestack plugin, use help for more info on subcommands'
		)
		.addArgument(
			new Argument(
				'<plugin-name>',
				'name of the plugin from gluestack group'
			)
		)
		.addArgument(
			new Argument(
				'<directory-name>',
				'name of the directory to install the plugin'
			)
		)
		.action(async (pluginName, directoryName) => {
			await install(app, pluginName, directoryName);
		});
};
