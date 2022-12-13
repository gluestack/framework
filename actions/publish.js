const { exec } = require('child_process');
const { fileExists } = require('../helpers/file');
const build = require('../helpers/plugin/build');
const { error, success, info } = require('../helpers/print');

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

module.exports = async () => {
	const currentDir = process.cwd();
	const filepath = currentDir + '/package.json';

	const packageJson = await getAndValidatePackageJson(filepath);
	await new Promise((resolve, reject) => {
		exec(
			'npm install tsc typescript @types/node',
			async (error, stdout, stderr) => {
				if (error) {
					reject(error);
					return;
				}
				info(stdout);
				resolve(true);
			}
		);
	});
	await build(currentDir);

	await exec(`node glue plugin-version`);
	success('Run `node glue plugin-version` in terminal');
};
