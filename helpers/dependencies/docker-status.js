const { spawn } = require('child_process');

const dockerStatus = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'docker',
			['info', '-f', `'{{ json .}}'`]
		);

		let data = '';

		_spawn.on('error', () => { return reject(`"DOCKER" is running?`) });

		_spawn.stdout.on('data', async (response) => (data += response));

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"DOCKER" is running?`);
			}
			data.includes('ServerErrors')
				? reject(`"DOCKER" is running?`)
				: resolve(`"DOCKER" is running?`);
		});
	});

module.exports = { dockerStatus };
