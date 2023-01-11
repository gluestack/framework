#!/usr/bin/env node

const App = require('./lib/app');
const commander = require('./helpers/commander');
const runDoctor = require('./actions/doctor');

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

	// close commander
	await commander.destroy();

	app.gluePluginStoreFactory.saveAllStores();
};

const glue = async (localPlugins = []) => {
	if (
		process.argv[2]
		&& process.argv[2] === '--doctor'
	) {
		await runDoctor();
		
		// remove the --doctor argument
		process.argv.splice(2, 1);
	}

	const app = init();

	await app.initPlugins(localPlugins);

	await commanderInit(app);

	await destroy(app);

	return app;
};

module.exports = glue;
