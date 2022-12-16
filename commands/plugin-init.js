/**
 * Installs the project or plugin
 */

const pluginInit = require('../actions/plugin-init');

module.exports = async (program) => {
	const command = program
		.command('plugin-init')
		.description('Initializes the gluestack app as a plugin');

	command
		.command('instance')
		.description('Initializes the gluestack app as a plugin instance')
		.action(() => pluginInit('instance'));

	command
		.command('container')
		.description(
			'Initializes the gluestack app as a container plugin'
		)
		.action(() => pluginInit('container'));
};
