const { isEmpty } = require('lodash');
const { error } = require('../print');
const { readFile, writeFile } = require('../file');
const { getTopToBottomPluginTree } = require('./plugins');
const { injectPluginInstanceStore } = require('../getStorePath');

const pluginInstance = async (
	pluginInstancesFilePath,
	packageName,
	instanceName,
	directoryName
) => {
	let data = await readFile(pluginInstancesFilePath);
	if (!data) {
		error('Meta plugin instances file is corrupted.');
		process.exit(0);
	}
	if (!data[packageName]) {
		data[packageName] = [];
	}
	data[packageName].push({
		instance: instanceName,
		directory: directoryName,
		container_store: {},
	});

	// write pluginInstances in file
	await writeFile(
		pluginInstancesFilePath,
		JSON.stringify(data, null, 2)
	);
};

async function attachPluginInstances(app, path, plugins) {
	const pluginInstancesFilePath = `${path}/meta/plugin-instances.json`;
	const pluginInstances = await readFile(pluginInstancesFilePath);
	if (!pluginInstances || isEmpty(pluginInstances)) {
		return;
	}

	for (const { plugin } of plugins) {
		const instances = pluginInstances[plugin.getName()];
		if (instances) {
			for (const { instance, directory } of instances) {
				attachPluginInstance(app, plugin, instance, directory);
			}
		}
	}
}

async function getTopToBottomPluginInstanceTree(app, path) {
	const plugins = await getTopToBottomPluginTree(app, path);
	await attachPluginInstances(app, path, plugins);
	return plugins;
}

async function getBottomToTopPluginInstanceTree(app, path) {
	const array = await getTopToBottomPluginInstanceTree(app, path);
	return array.reverse();
}

function attachPluginInstance(app, plugin, instance, directory) {
	return plugin.createInstance(
		instance,
		injectPluginInstanceStore(app, plugin.getName(), instance),
		directory
	);
}

module.exports = {
	pluginInstance,
	getTopToBottomPluginInstanceTree,
	getBottomToTopPluginInstanceTree,
	attachPluginInstance,
};
