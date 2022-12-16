#!/usr/bin/env node

const App = require('./lib/app');
const commander = require('./helpers/commander');

const commanderInit = async (app) => {
	// initialise the commander
	await commander.init();

	// register commands to the commander
	await commander.addCommands(app);
};

const init = () => {
	return new App();
};

const destroy = async (app) => {
	await app.destroyPlugins();

	app.gluePluginStoreFactory.saveAllStores();

	// close commander
	await commander.destroy();
};

const glue = async (localPlugins = []) => {
	const app = init();

	await app.initPlugins(localPlugins);

	await commanderInit(app);

	await destroy(app);

	return app;
};

module.exports = glue;
