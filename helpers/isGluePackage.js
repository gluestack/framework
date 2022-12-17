module.exports = (pluginName) => {
	if (pluginName.startsWith('glue-plugin-')) {
		return true;
	}
	if (pluginName.startsWith('@')) {
		let arr = pluginName.split(['/']);
		if (arr[1] && arr[1].startsWith('glue-plugin-')) {
			return true;
		}
	}
	return false;
};
