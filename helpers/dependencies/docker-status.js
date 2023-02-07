const { spawn } = require('child_process');

const dockerStatus = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('docker', ['info', '-f', `'{{ json .}}'`], { shell: true });
		let data = '';

		_spawn.stdout.on('data', async (response) => (data += response));
		_spawn.on('exit', () =>
			data.includes('ServerErrors')
				? reject(`"DOCKER" is running?`)
				: resolve(`"DOCKER" is running?`)
		);
	});

module.exports = { dockerStatus };
