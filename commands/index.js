const commands = () => {
	return [
		// require('./hello-world'),
		require('./plugin-list'),
		require('./plugin-init'),
		require('./publish'),
		require('./plugin-version'),
		require('./instance-list'),
		require('./install'),
	];
};

module.exports = commands;
