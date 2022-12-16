function getPluginStorePath(pluginName) {
	return `${process.cwd()}/meta/store/${pluginName}/index.json`;
}
function getPluginInstanceStorePath(instanceName, pluginName) {
	return `${process.cwd()}/meta/store/${pluginName}/${instanceName}.json`;
}

module.exports = { getPluginStorePath, getPluginInstanceStorePath };
