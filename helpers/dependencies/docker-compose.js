const { spawn } = require('child_process');

const dockerCompose = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('docker-compose', ['-v'], { shell: true });

		_spawn.on('error', () =>
			reject(`"DOCKER-COMPOSE" is installed?`)
		);
		_spawn.on('exit', () =>
			resolve(`"DOCKER-COMPOSE" is installed?`)
		);
	});

module.exports = { dockerCompose };
