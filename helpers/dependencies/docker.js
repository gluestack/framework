const { error } = require('../print')
const { spawn } = require('child_process');

const docker = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('docker', ['version', '--format', '{{json .Client.Version}}']);

		_spawn.on('error', () => reject(`"DOCKER" is installed?`));

		_spawn.stdout.on('data', (data) => {
			data = data.toString().replace(/[^\d.]/g, '').replace(/\.\d+/g, '');
			if (+data < 20) {
				error(`"Docker" version must be greater than or equal 20`);
				return reject();
			}
		});

		_spawn.on('exit', () => resolve(`"DOCKER" is installed?`));
	});

module.exports = { docker };
