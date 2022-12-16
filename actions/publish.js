const { fileExists } = require('../helpers/file');
const build = require('../helpers/plugin/build');
const { error, success, info, warning } = require('../helpers/print');
const mainEntryPoint = 'dist/src/index.js';

async function getAndValidatePackageJson(filepath) {
	if (!fileExists(filepath)) {
		error(
			'Plugin publish command failed: package.json does not exists'
		);
		process.exit(0);
	}
	const packageJson = require(filepath);
	if (!packageJson) {
		error(
			'Plugin publish command failed: package.json does not exists'
		);
		process.exit(0);
	}
	if (
		!packageJson.main ||
		(packageJson.main && packageJson.main !== mainEntryPoint)
	) {
		warning('Plugin publish command failed: plugin not initialized');
		process.exit(0);
	}
	return packageJson;
}

module.exports = async () => {
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';

	const packageJson = await getAndValidatePackageJson(filepath);
	await build(currentDir);

	success(`Successfully published a plugin`);
	info('Run `node glue plugin-version` in terminal');
};
