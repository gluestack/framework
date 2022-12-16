const { getPluginStorePath } = require('./getStorePath');
const { error } = require('./print');

function inject(app, pluginName) {
	const store = app.gluePluginStoreFactory.createPluginStoreInstance(
		getPluginStorePath(pluginName)
	);
	store.restore();
	return store;
}

function getPlugin(
	app,
	path,
	pluginName = null,
	throwErrorAndExit = false
) {
	try {
		const { GlueStackPlugin } = require(path);
		return new GlueStackPlugin(app, inject(app, pluginName));
	} catch (e) {
		if (throwErrorAndExit) {
			error('Plugin not initialized');
			process.exit(0);
		}
	}
}

module.exports = getPlugin;
