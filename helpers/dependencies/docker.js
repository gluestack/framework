const { spawn } = require('child_process');

const docker = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('docker', ['-v']);

		_spawn.on('error', () => reject(`"DOCKER" is installed?`));
		_spawn.on('exit', () => resolve(`"DOCKER" is installed?`));
	});

module.exports = { docker };
