const { isEmpty } = require('lodash');
const https = require('https');
const { setVar } = require('../helpers/variables');
const { fileExists, rm } = require('../helpers/file');
const download = require('../helpers/download');
const {
	pluginInstance: metaPluginInstance,
} = require('../helpers/meta/plugin-instances');
const metaExists = require('../helpers/meta/exists');
const { success, error, newline } = require('../helpers/print');
const { writePlugin } = require('../helpers/meta/plugins');
const getPlugin = require('../helpers/getPlugin');

async function validateAndGet(pluginName, directoryName) {
	/*
	try {
		await checkForPackage(pluginName);
	} catch (e) {
		error(`"${pluginName}" is not supported`);
		process.exit(0);
	}
	*/

	// adding the installed plugins
	const pluginInstancesFilePath =
		process.cwd() + '/meta/plugin-instances.json';
	const pluginFilePath = process.cwd() + '/meta/plugins.json';

	if (!fileExists(pluginFilePath)) {
		error(
			"Meta file is missing. Please go to project's root directory."
		);
		process.exit(0);
	}

	const folderName = directoryName;

	// check if plugin exists
	await metaExists(pluginInstancesFilePath, pluginName, folderName);

	return { pluginInstancesFilePath, pluginFilePath, folderName };
}

function checkForPackage(pluginName) {
	return new Promise((resolve, reject) => {
		https
			.get(
				`https://registry.npmjs.org/@gluestack/${pluginName}`,
				(res) => {
					if (res.statusCode === 200) {
						let body = '';
						res.on('data', (data) => (body += data));
						res.on('end', () => {
							resolve(JSON.parse(body).latest);
						});
					} else {
						reject();
					}
				}
			)
			.on('error', (e) => {
				reject(e);
			});
	});
}

module.exports = async (pluginName, directoryName) => {
	setVar('pluginName', pluginName);

	const { pluginInstancesFilePath, pluginFilePath, folderName } =
		await validateAndGet(pluginName, directoryName);

	const folderPath = `./${folderName}`;

	// download plugin project
	await download(
		pluginName,
		`@gluestack/${pluginName}`,
		folderPath,
		folderName
	);

	const packageName = `node_modules/@gluestack/${pluginName}`;
	const packagePath = `${process.cwd()}/${packageName}`;

	const plugin = await getPlugin(packagePath, true);

	await plugin.runPostInstall(folderPath);

	// updates meta/plugin-instances.json file
	await metaPluginInstance(
		pluginInstancesFilePath,
		pluginName,
		plugin,
		folderName
	);
	await writePlugin(pluginFilePath, packageName, pluginName, plugin);

	success(
		`Sucessfully installed '${pluginName}' in directory '${folderName}'`
	);
	newline();
};
