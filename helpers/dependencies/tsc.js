const { spawn } = require('child_process');

const tsc = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('tsc', ['-v'], { shell: true });

		_spawn.on('error', () => reject(`"TYPESCRIPT" is installed?`));
		_spawn.on('exit', () => resolve(`"TYPESCRIPT" is installed?`));
	});

module.exports = { tsc };
