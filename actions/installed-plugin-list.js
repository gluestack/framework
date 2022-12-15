const { info, newline, warning } = require('../helpers/print');
const {
	getTopToBottomPluginTree,
} = require('../helpers/meta/plugins');

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
		process.exit(0);
	}
	warning('No plugins are installed in your app.');
}

module.exports = async (type) => {
	const plugins = await getTopToBottomPluginTree(process.cwd());
	printPlugins(plugins);
	newline();
};
