const { info, newline, warning } = require('../helpers/print');
const {
	getTopToBottomPluginTree,
} = require('../helpers/meta/plugins');
const {
	getTopToBottomPluginInstanceTree,
} = require('../helpers/meta/plugin-instances');

function printPlugins(plugins) {
	arr = {};
	plugins.map((plugin) => {
		if (!arr[plugin.key]) {
			arr[plugin.key] = {
				version: plugin.plugin.getVersion(),
			};
		}
	});

	if (Object.keys(arr).length) {
		info('Installed Plugins');
		console.table(arr);
		return;
	}
	warning('No plugins are installed in your app.');
}

async function printInstalledPlugins() {
	const plugins = await getTopToBottomPluginTree(process.cwd());
	printPlugins(plugins);
	newline();
}

function printPluginInstances(plugins) {
	arr = [];
	plugins.map(({ key, plugin }) => {
		plugin.getInstances
			? plugin.getInstances().map((pluginInstance) => {
					arr.push({
						plugin: key,
						instance: pluginInstance.getName(),
						version: plugin.getVersion(),
					});
			  })
			: [];
	});

	if (Object.keys(arr).length) {
		info('Installed Instances');
		console.table(arr);
		return;
	}
	warning('No plugins are installed in your app.');
}

async function printInstalledPluginInstances() {
	const plugins = await getTopToBottomPluginInstanceTree(
		process.cwd()
	);
	printPluginInstances(plugins);
	newline();
}

module.exports = async () => {
	await printInstalledPlugins();
	await printInstalledPluginInstances();
};
