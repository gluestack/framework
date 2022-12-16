const { isEmpty } = require('lodash');
const { readFile, writeFile } = require('../file');
const getPlugin = require('../getPlugin');
const app = require('../../lib/app');
const { error } = require('../print');

const writePlugin = async (
	pluginFilePath,
	packageName,
	pluginName,
	plugin
) => {
	let data = await readFile(pluginFilePath);
	if (!data) {
		error('Meta plugins file is corrupted.');
		process.exit(0);
	}

	if (!data[pluginName]) {
		data[pluginName] = {
			package: packageName,
		};
		// write plugins in file
		await writeFile(pluginFilePath, JSON.stringify(data, null, 2));
	}
};

const bootPlugins = async (localPlugins) => {
	/*
	const pluginFilePath = 'meta/plugins.json';
	const projectPath = process.cwd();

	let data = await readFile(`${projectPath}/${pluginFilePath}`);

	if (!data) {
		return;
	}

	const packages = uniq(map(data, 'package'));

	return packages.map(async (package) => {
		const plugin = await getPlugin(`${projectPath}/${package}`);
		plugin.runBootstrap();
	});
	*/

	const plugins = await getTopToBottomPluginTree(process.cwd());
	let bootedPlugins = plugins.map((plugin) => {
		return plugin.plugin;
	});
	let bootedLocalPlugins = localPlugins.map((PluginClass) => {
		return new PluginClass(app);
	});
	let mergedPlugins = bootedPlugins.concat(bootedLocalPlugins);
	//unique installed and local plugins
	mergedPlugins = [
		...new Map(
			mergedPlugins.map((item) => [item.getName(), item])
		).values(),
	];
	return mergedPlugins.map((mergedPlugin) => {
		return mergedPlugin.runBootstrap();
	});
};

const getPluginTree = async (path, depth = 0, tree = {}) => {
	let key = depth ? 'peerDependencies' : 'dependencies';
	const pluginFilePath = `${path}/package.json`;

	let data = await readFile(pluginFilePath);

	if (!data[key] || isEmpty(data[key])) {
		return null;
	}

	const plugins = Object.keys(data[key]).filter((package) => {
		if (package.indexOf('@gluestack/') !== -1) return package;
	});

	if (!plugins || !plugins.length) {
		return null;
	}

	for (const plugin of plugins) {
		tree[plugin] = {
			plugin: await getPlugin(`${path}/node_modules/${plugin}`),
			dependencies: await getPluginTree(
				`${path}/node_modules/${plugin}`,
				++depth
			),
		};
	}

	return tree;
};

async function getTopToBottomPluginTree(path) {
	const tree = await getPluginTree(path);

	function recursivelyJoinArray(tree, arr = []) {
		if (tree && !isEmpty(tree)) {
			Object.keys(tree).map((key) => {
				if (tree[key].plugin) {
					arr.push({
						key: key,
						plugin: tree[key].plugin,
					});
				}
			});
			Object.keys(tree).map((key) => {
				if (tree[key].dependencies) {
					recursivelyJoinArray(tree[key].dependencies, arr);
				}
			});
		}
		return arr;
	}

	return recursivelyJoinArray(tree, []);
}

async function getBottomToTopPluginTree(path) {
	const array = await getTopToBottomPluginTree(path);
	return array.reverse();
}

module.exports = {
	bootPlugins,
	writePlugin,
	getPluginTree,
	getTopToBottomPluginTree,
	getBottomToTopPluginTree,
};
