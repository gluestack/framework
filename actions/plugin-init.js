const {
	fileExists,
	readFile,
	writeFile,
	copyFile,
	createFolder,
} = require('../helpers/file');
const { error, warning, success } = require('../helpers/print');
const mainEntryPoint = 'dist/src/index.js';

const pluginStubFiles = [
	{
		dir: 'src',
		source:
			'node_modules/@gluestack/framework/types/plugin/stubs/index.ts.txt',
		target: 'src/index.ts',
	},
	{
		dir: 'src',
		source:
			'node_modules/@gluestack/framework/types/plugin/stubs/copyToTarget.ts.txt',
		target: 'src/copyToTarget.ts',
	},
	{
		dir: 'src',
		source:
			'node_modules/@gluestack/framework/types/plugin/stubs/postInstall.ts.txt',
		target: 'src/postInstall.ts',
	},
];

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
	json.scripts = {
		...json.scripts,
		'build-plugin': 'tsc',
	};
	await writeFile(filepath, JSON.stringify(json));
	return packageJson.name;
}

async function copyPluginFiles(currentDir) {
	for (const stubFile of pluginStubFiles) {
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

module.exports = async () => {
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';

	const packageJson = await getAndValidatePackageJson(filepath);
	await writeToPackageJson(filepath, packageJson);
	await copyPluginFiles(currentDir);

	success(`Successfully initialized ${packageJson.name} as a plugin`);
};
