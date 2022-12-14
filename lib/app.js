const runDoctor = require('../actions/doctor');

class App {
	constructor() {
		this.commands = []
	}
	addCommand = async (runner) => {
		return this.commands.push(runner);
	};
	populatePlugins(plugins) {
		this.plugins = plugins;
	}
	async doctor() {
		await runDoctor();
	}
}

const app = new App();

module.exports = app;
