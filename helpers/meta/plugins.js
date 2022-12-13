const { readFile, writeFile } = require('../file');

const writePlugin = async (
	pluginFilePath,
	serviceName,
	serviceType,
	packageName,
	directoryName = ''
) => {
	const projectPath = process.cwd();

	let data = await readFile(`${projectPath}/${pluginFilePath}`);
	if (!data) {
		error('Meta plugins file is corrupted.');
		process.exit(0);
	}
	data.push({
		name: serviceName,
		directory: directoryName,
		package: packageName,
		type: serviceType,
	});
	// write services in file
	await writeFile(
		`${projectPath}/${pluginFilePath}`,
		JSON.stringify(data, null, 2)
	);
};

const bootPlugins = async () => {
	const pluginFilePath = 'meta/plugins.json';
	const projectPath = process.cwd();

	let data = await readFile(`${projectPath}/${pluginFilePath}`);

	if (!data) {
		return;
	}

	return data.filter((item) => {
		try {
			const {
				GlueStackPlugin,
			} = require(`${projectPath}/${item.package}`);
			const plugin = new GlueStackPlugin();
			plugin.runBootstrap();
		} catch (e) {
			//
		}
	});
};

module.exports = { bootPlugins, writePlugin };
