module.exports = (pluginName) => {
	if (pluginName.indexOf('glue-plugin-') === -1) {
		return false;
	}
	return true;
};
