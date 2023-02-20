const { spawn } = require('child_process');

const yarn = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'yarn',
			['-v'],
			process.platform === 'win32'
				? { shell: true }
				: { shell: false }
		);

		_spawn.on('error', () => { return reject(`"YARN" is installed?`) });

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"YARN" is installed?`);
			}
			return resolve(`"YARN" is installed?`);
		});
	});

module.exports = { yarn };
