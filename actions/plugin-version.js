const { fileExists } = require('../helpers/file');
const getPlugin = require('../helpers/getPlugin');
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

module.exports = async () => {
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';
	const packageJson = await getAndValidatePackageJson(filepath);

	const plugin = await getPlugin(currentDir, true);

	success(`${packageJson.name} is at v${plugin.getVersion()}`);
};
