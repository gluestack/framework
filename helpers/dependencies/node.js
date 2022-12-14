const { error } = require('../print')
const { spawn } = require('child_process');

const node = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('node', ['-v']);

		_spawn.on('error', () => reject(`"NODE" is installed?`));

		_spawn.stdout.on('data', (data) => {
			data = data.toString().slice(1, -3);
			if (+data < 16.16) {
				error(`"NODE" version must be greater than or equal 16.16.0`);
				return reject();
			}
		});

		_spawn.on('exit', () => resolve(`"NODE" is installed?`));
	});

module.exports = { node };
