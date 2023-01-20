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
const getDependencies = require('../helpers/get-dependencies');

const prefix = 'glue-plugin-';

async function validateAndGet(pluginName, instanceName) {
	let packageName = pluginName;
	try {
		await checkForPackage(pluginName);
		packageName = `@gluestack/${prefix}${pluginName}`;
	} catch (e) {
		//
	}

	if (!isGluePackage(packageName)) {
		error(`"${packageName}" is not supported`);
		process.exit(0);
	}

	if (instanceName.indexOf('/') !== -1) {
		error(
			`${instanceName} is not valid, does not support nested instance.`
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

	const folderName = instanceName;

	// check if plugin exists
	await metaExists(pluginInstancesFilePath, packageName, folderName);

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
				`https://registry.npmjs.org/@gluestack/${prefix}${pluginName}`,
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

module.exports = async (app, pluginName, instanceName) => {
	setVar('pluginName', pluginName);

	const {
		pluginInstancesFilePath,
		pluginFilePath,
		folderName,
		packageName,
	} = await validateAndGet(pluginName, instanceName);

	// download plugin project
	await download(pluginName, packageName);

	const nodeModulesPackageName = `node_modules/${packageName}`;
	const packagePath = `${process.cwd()}/${nodeModulesPackageName}`;

	const plugin = await getPlugin(app, packagePath, packageName, true);

	const folderPath = await plugin.getInstallationPath(folderName);

	if (!(await checkFolderIsEmpty(folderPath))) {
		error(
			`${pluginName} installed failed: ${folderPath} is not empty`
		);
		process.exit(0);
	}

	await checkForDependencies(app, packageName);

	try {
		await plugin.runPostInstall(folderName, folderPath);
	} catch (e) {
		error(
			`${pluginName} installed failed: ${
				e.message || 'Something went wrong'
			}`
		);
		newline();
		process.exit(0);
	}

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
		`Sucessfully installed '${pluginName}' as instance ${folderName} in directory '${folderPath}'`
	);
	newline();
};

async function checkForDependencies(app, packageName) {
	let missing = [];
	const dependencies = await getDependencies(app, packageName);
	for (const plugin of dependencies) {
		if (plugin.getInstances().length === 0) {
			missing.push(plugin);
		}
	}

	if (missing.length) {
		error(`${packageName} installed failed: Missing dependencies`);
		console.log('\x1b[36m');
		for (const plugin of missing) {
			let arr = plugin.getName().split('-');
			console.log(
				`Install dependency: \`node glue add ${plugin.getName()} ${
					arr[arr.length - 1]
				}\``
			);
		}
		console.log('\x1b[37m');
		newline();
		process.exit(0);
	}
}
