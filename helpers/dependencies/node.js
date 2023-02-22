const { error } = require('../print');
const { spawn } = require('child_process');

const node = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'node',
			['-v'],
			process.platform === 'win32'
				? { shell: true }
				: { shell: false }
		);

		_spawn.on('error', () => { return reject(`"NODE" is installed?`) });

		_spawn.stdout.on('data', (data) => {
			data = data
				.toString()
				.replace(/[^\d.]/g, '')
				.replace(/\.\d+/g, '');
			if (data < 18) {
				error(`"NODE" version must be greater than or equal 18`);
				return reject();
			}
		});

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"NODE" is installed?`);
			}
			return resolve(`"NODE" is installed?`);
		});
	});

module.exports = { node };
