const { error } = require('../print');
const { getVar } = require('../variables');
const { readFile, writeFile } = require('../file');

const pluginInstance = async (
	pluginInstancesFilePath,
	packageName,
	plugin,
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
		directory: directoryName || packageName,
		container_store: {},
	});

	// write pluginInstances in file
	await writeFile(
		pluginInstancesFilePath,
		JSON.stringify(data, null, 2)
	);
};

module.exports = { pluginInstance };
