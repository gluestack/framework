const { fileExists } = require('../helpers/file');
const { success, error } = require('../helpers/print');

async function getAndValidatePackageJson(filepath) {
	if (!fileExists(filepath)) {
		error(
			'Plugin version command failed: package.json does not exists'
		);
		process.exit(0);
	}
	const packageJson = require(filepath);
	if (!packageJson) {
		error(
			'Plugin version command failed: package.json does not exists'
		);
		process.exit(0);
	}
	return packageJson;
}

async function getPlugin(currentDir) {
	try {
		const { GlueStackPlugin } = require(`${currentDir}`);
		return new GlueStackPlugin();
	} catch (e) {
		error('Plugin not initialized');
		process.exit(0);
	}
}

module.exports = async () => {
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';
	const packageJson = await getAndValidatePackageJson(filepath);

	const plugin = await getPlugin(currentDir);

	success(`${packageJson.name} is at v${plugin.getVersion()}`);
};
