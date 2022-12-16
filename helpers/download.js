const getPlugin = require('./getPlugin');
const { info } = require('./print');
// const { copyFolder } = require('../helpers/file');
const exec = require('child_process').exec;

async function execute(steps, folderPath) {
	for (const step of steps) {
		await new Promise((resolve, reject) => {
			exec(step, async (error, stdout, stderr) => {
				if (error) {
					reject(error);
					return;
				}
				info(stdout);
				resolve(true);
			});
		});
	}
}

module.exports = async (
	pluginName,
	packageName,
	folderPath,
	folderName
) => {
	info(
		`Installing '${pluginName}' from '${packageName}' in directory '${folderName}'`
	);
	await execute([`npm install ${packageName}`], folderPath);

	/*
	await plugin.runPostInstall(folderName);

	await execute([
		`echo "Sucessfully installed '${pluginName}' in directory '${folderName}'"`,
	]);
	*/
};
