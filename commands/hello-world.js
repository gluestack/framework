/**
 * hello-worlds print Hello world! in terminal.
 */
const command = require('../actions/hello-world');

module.exports = async (program, app) => {
	// hello-world project command
	program
		.command('hello-world')
		.description('Prints Hello world!')
		.action(command);
};
