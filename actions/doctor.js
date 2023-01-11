const colors = require('colors');
const {
	yarn,
	docker,
	dockerCompose,
	hasura,
	node,
	dockerStatus,
	npm,
} = require('../helpers/dependencies');
const { info, error } = require('../helpers/print');

const runDoctor = async () => {
	const results = await Promise.allSettled([
		node(),
		npm(),
		hasura(),
		docker(),
		dockerStatus(),
	]);

	let failed = false;

	results.forEach((result) => {
		if (result.status === 'rejected' && result.reason) {
			info(result.reason, 'NO'.brightRed);
			failed = true;
		}

		if (result.status === 'fulfilled') {
			info(result.value, 'YES'.brightGreen);
		}
	});
	if (failed) {
		error(`Pre-Requisites check for installation failed.`);
		process.exit(0);
	}
};

module.exports = runDoctor;
