const commands = () => {
	return [
		require('./hello-world'),
		require('./plugin-init'),
		require('./publish'),
		require('./plugin-version'),
		require('./plugin-list'),
		require('./install'),
	];
};

module.exports = commands;
