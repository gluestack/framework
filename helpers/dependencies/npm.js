const { error } = require('../print');
const { spawn } = require('child_process');

const npm = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('npm', ['-v'], { shell: true });

		_spawn.on('error', () => reject(`"NPM" is installed?`));

		_spawn.stdout.on('data', (data) => {
			data = data.toString().replace(/[^\d.]/g, '').replace(/\.\d+/g, '');
			if (data < 8) {
				error(`"NPM" version must be greater than or equal 8`);
				return reject();
			}
		});

		_spawn.on('exit', () => resolve(`"NPM" is installed?`));
	});

module.exports = { npm };
