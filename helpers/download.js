const getPlugin = require('./getPlugin');
const { info } = require('./print');
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
	serviceName,
	packageName,
	folderPath,
	folderName
) => {
	info(
		`Installing '${serviceName}' from '${packageName}' in directory '${folderName}'`
	);
	await execute([`npm install ${packageName}`], folderPath);

	const plugin = await getPlugin(
		`${process.cwd()}/node_modules/${packageName}`
	);
	await plugin.runPostInstall(folderName);

	await execute([
		`echo "Sucessfully installed '${serviceName}' in directory '${folderName}'"`,
	]);
};
