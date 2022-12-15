const app = require('../lib/app');
const { error } = require('./print');

function getPlugin(path, throwErrorAndExit = false) {
	try {
		const { MyGlueStackPlugin } = require(path);
		return new MyGlueStackPlugin(app);
	} catch (e) {
		if (throwErrorAndExit) {
			error('Plugin not initialized', e);
			process.exit(0);
		}
	}
}

module.exports = getPlugin;
