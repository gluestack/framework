const getPlugin = require('./getPlugin');
const { info } = require('./print');
// const { copyFolder } = require('../helpers/file');
const exec = require('child_process').exec;

async function execute(steps) {
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

module.exports = async (pluginName, packageName) => {
	info(`Installing '${pluginName}' from '${packageName}'`);
	await execute([`npm install ${packageName}`], folderPath);
};
