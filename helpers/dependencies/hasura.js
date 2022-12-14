const { spawn } = require('child_process');

const hasura = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn('hasura', ['version']);

		_spawn.on('error', () => reject(`"HASURA CLI" is installed?`));
		_spawn.on('exit', () => resolve(`"HASURA CLI" is installed?`));
	});

module.exports = { hasura };
