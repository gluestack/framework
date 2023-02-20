const { error } = require('../print');
const { spawn } = require('child_process');

const hasura = async () =>
	new Promise((resolve, reject) => {
		const _spawn = spawn(
			'hasura',
			['version'],
			process.platform === 'win32'
				? { shell: true }
				: { shell: false }
		);

		_spawn.on('error', () => { return reject(`"HASURA CLI" is installed?`) });

		_spawn.stdout.on('data', (data) => {
			data = JSON.parse(data.toString())
				.version.replace(/[^\d.]/g, '')
				.replace(/\.\d+/g, '');
			if (data < 2) {
				error(`"HASURA" version must be greater than or equal to 2`);
				return reject();
			}
		});

		_spawn.on('exit', (result) => {
			if (result) {
				return reject(`"HASURA CLI" is installed?`);
			}
			return resolve(`"HASURA CLI" is installed?`)
		});
	});

module.exports = { hasura };
