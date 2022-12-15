#!/usr/bin/env node

const app = require('./lib/app');
const { bootPlugins } = require('./helpers/meta/plugins');
const { init, addCommands, close } = require('./helpers/commander');

const commanderInit = async (app) => {
	// initialise the commander
	await init();

	// register commands to the commander
	await addCommands(app);

	// close commander
	await close();
};

const glue = async (localPlugins = []) => {
	// initialise the commander

	app.populatePlugins(await bootPlugins(localPlugins));

	await commanderInit(app);

	// app.plugins["web"].getDockerFile();
	return app;
};

module.exports = glue;
