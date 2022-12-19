const { Command } = require('commander');
const { getVar } = require('./variables');
const { version } = require('../package.json');
const commands = require('../commands');

const program = new Command();
const commander = {};

// initialize the glue command
commander.init = async () => {
	if (process.argv.length === 2) {
		process.argv.push('-h');
	}
	program
		.name('glue')
		.version('gluestack Version ' + version)
		.description('gluestack framework');
};

// adds all the commands from the directory
commander.addCommands = async (app) => {
	const cmds = commands().concat(app.commands);
	cmds.forEach((cmd) => cmd(program, app));
};

// parses and closes the command
commander.destroy = async () => {
	await program.parseAsync();
};

module.exports = commander;
