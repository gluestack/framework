const { injectPluginStore } = require('./getStorePath');
const { error } = require('./print');

function getPlugin(
	app,
	path,
	pluginName = null,
	throwErrorAndExit = false
) {
	try {
		const { GlueStackPlugin } = require(path);
		return new GlueStackPlugin(
			app,
			injectPluginStore(app, pluginName)
		);
	} catch (e) {
		if (throwErrorAndExit) {
			error('Plugin not initialized');
			process.exit(0);
		}
	}
}

module.exports = getPlugin;
