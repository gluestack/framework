var events = require('events');
const runDoctor = require('../actions/doctor');
const { copyFolder } = require('../helpers/file');

class App {
	constructor() {
		this.commands = [];
		this.eventEmitter = new events.EventEmitter();
	}
	//push cli command
	addCommand = async (runner) => {
		return this.commands.push(runner);
	};
	//plugins
	populatePlugins(plugins) {
		this.plugins = plugins;
	}
	//checks
	async doctor() {
		await runDoctor();
	}
	//event
	dispatchEvent(eventName) {
		this.eventEmitter.emit(eventName);
	}
	//listener
	addEventListener(eventName, callback = () => {}) {
		this.eventEmitter.on(eventName, callback);
	}
	//plugin instance
	async createPluginInstance(src, target) {
		return await copyFolder(src, target);
	}
}

const app = new App();

module.exports = app;
