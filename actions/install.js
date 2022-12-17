const { isEmpty, indexOf } = require('lodash');
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
const isGluePackage = require('../helpers/isGluePackage');

async function validateAndGet(pluginName, directoryName) {
	let packageName = pluginName;
	if (!isGluePackage(pluginName)) {
		error(`"${pluginName}" is not supported`);
		process.exit(0);
	}

	try {
		await checkForPackage(pluginName);
		packageName = `@gluestack/${pluginName}`;
	} catch (e) {
		//
	}

	if (directoryName.indexOf('/') !== -1) {
		error(
			`${directoryName} is not valid, does not support nested directory.`
		);
		process.exit(0);
	}

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
	await metaExists(
		pluginInstancesFilePath,
		`@gluestack/${pluginName}`,
		folderName
	);

	return {
		pluginInstancesFilePath,
		pluginFilePath,
		folderName,
		packageName,
	};
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

module.exports = async (app, pluginName, directoryName) => {
	setVar('pluginName', pluginName);

	const {
		pluginInstancesFilePath,
		pluginFilePath,
		folderName,
		packageName,
	} = await validateAndGet(pluginName, directoryName);

	const folderPath = `./${folderName}`;

	if (!(await checkFolderIsEmpty(folderPath))) {
		error(
			`${pluginName} installed failed: ${folderPath} is not empty`
		);
		process.exit(0);
	}

	// download plugin project
	await download(pluginName, packageName, folderPath, folderName);

	const nodeModulesPackageName = `node_modules/${packageName}`;
	const packagePath = `${process.cwd()}/${nodeModulesPackageName}`;

	const plugin = await getPlugin(app, packagePath, packageName, true);

	await plugin.runPostInstall(folderName, folderPath);

	// updates meta/plugin-instances.json file
	await metaPluginInstance(
		pluginInstancesFilePath,
		packageName,
		folderName,
		folderPath
	);
	await writePlugin(
		pluginFilePath,
		nodeModulesPackageName,
		packageName,
		plugin
	);

	success(
		`Sucessfully installed '${pluginName}' in directory '${folderName}'`
	);
	newline();
};
