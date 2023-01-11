const { error } = require('../print');
const { spawn } = require('child_process');

const node = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('node', ['-v']);

		_spawn.on('error', () => reject(`"NODE" is installed?`));

		_spawn.stdout.on('data', (data) => {
			data = data.toString().replace(/[^\d.]/g, '').replace(/\.\d+/g, '');
			if (data < 18) {
				error(`"NODE" version must be greater than or equal 18`);
				return reject();
			}
		});

		_spawn.on('exit', () => resolve(`"NODE" is installed?`));
	});

module.exports = { node };
