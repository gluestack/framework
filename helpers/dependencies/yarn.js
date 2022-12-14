const { spawn } = require('child_process');

const yarn = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('yarn', ['-v']);

		_spawn.on('error', () => reject(`"YARN" is installed?`));
		_spawn.on('exit', () => resolve(`"YARN" is installed?`));
	});

module.exports = { yarn };
