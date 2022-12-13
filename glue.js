#!/usr/bin/env node

const commander = require('./helpers/commander');
const { bootPlugins } = require('./helpers/meta/plugins');

class App {
	constructor(commander) {
		this.cli = commander;
	}
	populatePlugins(plugins) {
		this.plugins = plugins;
	}
}

const commanderInit = async () => {
	// initialise the commander
	await commander.init();

	// register commands to the commander
	await commander.addCommands();

	// close commander
	await commander.close();
};

const initApp = async () => {
	return new App(commander);
};

const glue = async () => {
	// initialise the commander
	const app = await initApp(commander);

	// initialise the commander
	app.populatePlugins(await bootPlugins());

	await commanderInit(app);

	// app.plugins["web"].getDockerFile();
	return app;
};

module.exports = glue;
