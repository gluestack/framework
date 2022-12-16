const colors = require('colors');
const { yarn, node, tsc } = require('../helpers/dependencies');
const { info, error } = require('../helpers/print');

const runDoctorPlugin = async () => {
	const results = await Promise.allSettled([node(), yarn(), tsc()]);

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
		error(`Pre-requisites check for plugin init failed.`);
		process.exit(0);
	}
};

module.exports = runDoctorPlugin;
