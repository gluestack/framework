/**
 * Installs the project or plugin
 */

const { Argument } = require('commander');
const install = require('../actions/install');

module.exports = async (program) => {
	// install group command
	const command = program
		.command('install')
		.description(
			'installs the service or feature, use help for more info on subcommands'
		)
		.addArgument(
			new Argument(
				'<service-name>',
				'name of the service from app-services group'
			)
		)
		.addArgument(
			new Argument(
				'<directory-name>',
				'name of the directory for app-services'
			)
		)
		.action(install);
};
