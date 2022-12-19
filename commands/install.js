/**
 * Installs the project or plugin
 */

const { Argument } = require('commander');
const install = require('../actions/install');

module.exports = async (program, app) => {
	// install group command
	const command = program
		.command('add')
		.alias('install')
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
				'<instance-name>',
				'name of the instance to install the plugin'
			)
		)
		.action(async (pluginName, instanceName) => {
			await install(app, pluginName, instanceName);
		});
};
