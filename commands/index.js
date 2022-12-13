const commands = () => {
	return [
		require('./hello-world'),
		require('./plugin-init'),
		require('./publish'),
		require('./plugin-version'),
		require('./install'),
	];
};

module.exports = commands;
