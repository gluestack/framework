const { exec } = require('child_process');
const {
	fileExists,
	readFile,
	writeFile,
	copyFile,
	createFolder,
} = require('../helpers/file');
const { error, warning, success, info } = require('../helpers/print');
const mainEntryPoint = 'dist/src/index.js';
const os = require('os');
const runDoctorPlugin = require('./doctorPlugin');

const pluginStubFiles = {
	instance: [
		{
			dir: 'src',
			source:
				'node_modules/@gluestack/framework/types/plugin/stubs/GlueStackPlugin.ts.txt',
			target: 'src/index.ts',
		},
		{
			dir: 'src',
			source:
				'node_modules/@gluestack/framework/types/plugin/stubs/PluginInstance.ts.txt',
			target: 'src/PluginInstance.ts',
		},
	],
	container: [
		{
			dir: 'src',
			source:
				'node_modules/@gluestack/framework/types/plugin/stubs/GlueStackPlugin.ts.txt',
			target: 'src/index.ts',
		},
		{
			dir: 'src',
			source:
				'node_modules/@gluestack/framework/types/plugin/stubs/PluginInstanceWithContainerController.ts.txt',
			target: 'src/PluginInstance.ts',
		},
		{
			dir: 'src',
			source:
				'node_modules/@gluestack/framework/types/plugin/stubs/PluginInstanceContainerController.ts.txt',
			target: 'src/PluginInstanceContainerController.ts',
		},
	],
};

async function getAndValidatePackageJson(filepath) {
	if (!fileExists(filepath)) {
		error('Plugin init command failed: package.json does not exists');
		process.exit(0);
	}
	const packageJson = require(filepath);
	if (!packageJson) {
		error('Plugin init command failed: package.json does not exists');
		process.exit(0);
	}
	return packageJson;
}

async function writeToPackageJson(filepath, packageJson) {
	if (packageJson.main) {
		if (packageJson.main === mainEntryPoint) {
			warning('Plugin init command failed: already a plugin');
			process.exit(0);
		}

		error(
			'Writing to package.json failed: plugin entry point already exists'
		);
		process.exit(0);
	}
	const json = await readFile(filepath);
	json.main = mainEntryPoint;
	await writeFile(filepath, JSON.stringify(json, null, 2) + os.EOL);
	return json.name;
}

async function copyPluginFiles(currentDir, type) {
	if (pluginStubFiles[type]) {
		for (const stubFile of pluginStubFiles[type]) {
			if (stubFile.dir) {
				if (!(await fileExists(stubFile.dir))) {
					await createFolder(stubFile.dir);
				}
			}
			await copyFile(
				`${currentDir}/${stubFile.source}`,
				`${currentDir}/${stubFile.target}`
			);
		}
	}
}

async function createTemplateFolder(currentDir, packageJson) {
	await createFolder(`${currentDir}/template`);
	await writeFile(
		`${currentDir}/template/README.md`,
		packageJson.name
	);
}

module.exports = async (type) => {
	await runDoctorPlugin();
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';

	const packageJson = await getAndValidatePackageJson(filepath);
	await writeToPackageJson(filepath, packageJson);
	await copyPluginFiles(currentDir, type);
	await createTemplateFolder(currentDir, packageJson);
	await new Promise((resolve, reject) => {
		exec('npm install @types/node', async (error, stdout, stderr) => {
			if (error) {
				reject(error);
				return;
			}
			info(stdout);
			resolve(true);
		});
	});

	success(`Successfully initialized ${packageJson.name} as a plugin`);
	info('Run `node glue publish` in terminal to publish this plugin');
};
