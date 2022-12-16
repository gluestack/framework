var events = require('events');
const runDoctor = require('../actions/doctor');
const { copyFolder } = require('../helpers/file');
const {
	getTopToBottomPluginInstanceTree,
} = require('../helpers/meta/plugin-instances');
const GluePluginStoreFactory = require('../lib/factory/plugin/GluePluginStoreFactory');

class App {
	constructor() {
		this.commands = [];
		this.eventEmitter = new events.EventEmitter();
		this.gluePluginStoreFactory = new GluePluginStoreFactory();
	}
	//push cli command
	addCommand = async (runner) => {
		return this.commands.push(runner);
	};
	async populatePlugins(localPlugins) {
		const plugins = await getTopToBottomPluginInstanceTree(
			this,
			process.cwd()
		);
		let bootedPlugins = plugins.map(({ plugin }) => {
			return plugin;
		});
		let bootedLocalPlugins = localPlugins.map((PluginClass) => {
			return new PluginClass(this);
		});
		let mergedPlugins = bootedPlugins.concat(bootedLocalPlugins);
		//unique installed and local plugins
		mergedPlugins = [
			...new Map(
				mergedPlugins.map((item) => [item.getName(), item])
			).values(),
		];
		this.plugins = mergedPlugins;
	}
	//plugins
	async initPlugins(localPlugins) {
		await this.populatePlugins(localPlugins);
		for (const plugin of this.plugins) {
			await plugin.init();
		}
		await this.initPluginInstances();
	}
	async destroyPlugins() {
		await this.destroyPluginInstances();
		for (const plugin of this.plugins) {
			await plugin.destroy();
		}
	}
	async initPluginInstances() {
		for (const plugin of this.plugins) {
			for (const instance of plugin.getInstances()) {
				await instance.init();
			}
		}
	}
	async destroyPluginInstances() {
		for (const plugin of this.plugins) {
			for (const instance of plugin.getInstances()) {
				await instance.destroy();
			}
		}
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

module.exports = App;
