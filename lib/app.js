var events = require('events');
const runDoctor = require('../actions/doctor');
const { copyFolder } = require('../helpers/file');
const { injectPluginStore } = require('../helpers/getStorePath');
const {
	getTopToBottomPluginInstanceTree,
	attachPluginInstance,
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
			const p = new PluginClass(this);
			return new PluginClass(
				this,
				injectPluginStore(this, p.getName())
			);
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
	async createPluginInstance(plugin, instance, src, target) {
		if (src && target) {
			await copyFolder(src, target);
		}
		return attachPluginInstance(this, plugin, instance, target);
	}
	//plugin instance
	getPluginByName(pluginName) {
		for (const plugin of this.plugins) {
			if (plugin.getName() === pluginName) {
				return plugin;
			}
		}
		return null;
	}
	//plugin instance
	getContainerTypePluginInstances(bottomToTop = false, returnWithTree = false) {
		const tree = {};
		const instances = [];
		for (const plugin of this.plugins) {
			tree[plugin.getName()] = {};
			for (const instance of plugin.getInstances()) {
				if (!instance.isOfTypeInstance) {
					tree[plugin.getName()][instance.getName()] = instance;
					instances.push(instance);
				}
			}
		}
		if (bottomToTop) {
			return instances.reverse();
		}
		if(returnWithTree) return {tree, instances};
		return instances;
	}
}

module.exports = App;
