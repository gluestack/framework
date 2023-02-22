const { error } = require('../print');
const { spawn } = require('child_process');

const npm = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'npm',
			['-v'],
			process.platform === 'win32'
				? { shell: true }
				: { shell: false }
		);

		_spawn.on('error', () => { return reject(`"NPM" is installed?`) });

		_spawn.stdout.on('data', (data) => {
			data = data
				.toString()
				.replace(/[^\d.]/g, '')
				.replace(/\.\d+/g, '');
			if (data < 8) {
				error(`"NPM" version must be greater than or equal 8`);
				return reject();
			}
		});

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"NPM" is installed?`);
			}
			return resolve(`"NPM" is installed?`);
		});
	});

module.exports = { npm };
