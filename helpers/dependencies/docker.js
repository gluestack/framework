const { error } = require('../print')
const { spawn } = require('child_process');

const docker = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('docker', ['version', '--format', '{{json .Client.Version}}']);

		_spawn.on('error', () => reject(`"DOCKER" is installed?`));

		_spawn.stdout.on('data', (data) => {
			const version = data.split(".");
			version.splice(2);

			if (+version[0] < 20) {
				error(`"Docker" version must be greater than or equal 20`);
				return reject();
			}

			if (+version[0] <= 20 && +version[1] < 10) {
				error(`"Docker" version must be greater than or equal 20`);
				return reject();
			}
		});

		_spawn.on('exit', () => resolve(`"DOCKER" is installed?`));
	});

module.exports = { docker };
