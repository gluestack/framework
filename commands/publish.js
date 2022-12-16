/**
 * Installs the project or plugin
 */

const publish = require('../actions/publish');

module.exports = async (program, app) => {
	program
		.command('publish')
		.description('Publishes the gluestack app as a plugin')
		.action(() => {
			publish(app);
		});
};
