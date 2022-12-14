const app = require('../lib/app');

function getPlugin(path, throwErrorAndExit = false) {
	try {
		const { GlueStackPlugin } = require(path);
		return new GlueStackPlugin(app);
	} catch (e) {
		if (throwErrorAndExit) {
			error('Plugin not initialized');
			process.exit(0);
		}
	}
}

module.exports = getPlugin;
