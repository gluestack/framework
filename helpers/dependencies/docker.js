const { error } = require('../print');
const { spawn } = require('child_process');

const docker = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'docker',
			['--version'],
			process.platform === 'win32'
				? { shell: true }
				: { shell: false }
		);

		let dockerVersion = '';

		_spawn.on('error', () => { return reject(`"DOCKER" is installed?`) });

		_spawn.stdout.on('data', (data) => {
			dockerVersion += data.toString();
		});

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"DOCKER" is installed?`);
			}
			const versionMatch = dockerVersion.match(/(\d+)\.\d+/);
			const data = versionMatch?.[0];
			const version = data.toString().split('.');
			version.splice(2);

			if (+version[0] < 20) {
				error(`"Docker" version must be greater than or equal 20`);
				return reject();
			}

			if (+version[0] <= 20 && +version[1] < 10) {
				error(`"Docker" version must be greater than or equal 20`);
				return reject();
			}

			return resolve(`"DOCKER" is installed?`);
		});
	});

module.exports = { docker };
