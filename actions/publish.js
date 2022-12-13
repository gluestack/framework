const { fileExists } = require('../helpers/file');
const build = require('../helpers/plugin/build');
const { error, success } = require('../helpers/print');

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
	return packageJson;
}

async function getPlugin(currentDir) {
	const { GlueStackPlugin } = require(`${currentDir}`);
	return new GlueStackPlugin();
}

module.exports = async () => {
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';

	const packageJson = await getAndValidatePackageJson(filepath);
	await build(currentDir);

	const plugin = await getPlugin(currentDir);

	success(
		`Successfully published ${
			packageJson.name
		}:${plugin.getVersion()} as a plugin`
	);
};
