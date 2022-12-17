function getPluginStorePath(pluginName) {
	return `${process.cwd()}/meta/store/${pluginName}/index.json`;
}
function getPluginInstanceStorePath(instanceName, pluginName) {
	return `${process.cwd()}/meta/store/${pluginName}/${instanceName}.json`;
}

function injectPluginStore(app, pluginName) {
	const store = app.gluePluginStoreFactory.createPluginStoreInstance(
		getPluginStorePath(pluginName)
	);
	store.restore();
	return store;
}

function injectPluginInstanceStore(app, pluginName, instance) {
	const store = app.gluePluginStoreFactory.createPluginStoreInstance(
		getPluginInstanceStorePath(instance, pluginName)
	);
	store.restore();
	return store;
}

module.exports = {
	getPluginStorePath,
	getPluginInstanceStorePath,
	injectPluginStore,
	injectPluginInstanceStore,
};
