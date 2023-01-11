const { spawn } = require('child_process');

const npm = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('npm', ['-v']);

		_spawn.on('error', () => reject(`"NPM" is installed?`));
		_spawn.on('exit', () => resolve(`"NPM" is installed?`));
	});

module.exports = { npm };
