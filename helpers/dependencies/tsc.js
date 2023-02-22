const { spawn } = require('child_process');

const tsc = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'tsc',
			['-v'],
			process.platform === 'win32'
				? { shell: true }
				: { shell: false }
		);

		_spawn.on('error', () => { return reject(`"TYPESCRIPT" is installed?`) });

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"TYPESCRIPT" is installed?`);
			}
			return resolve(`"TYPESCRIPT" is installed?`);
		});
	});

module.exports = { tsc };
