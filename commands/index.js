const commands = () => {
	return [
		require('./hello-world'),
		require('./plugin-init'),
		require('./publish'),
		require('./install'),
	];
};

module.exports = commands;
