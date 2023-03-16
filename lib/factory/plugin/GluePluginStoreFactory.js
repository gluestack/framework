const { find } = require('lodash');
const GluePluginStore = require('../../store/GluePluginStore');

class GluePluginStoreFactory {
	stores = [];

	createPluginStoreInstance(path) {
		const loadedStore = find(this.stores, {
			path: path
		});
		if (loadedStore) return loadedStore;
		const store = new GluePluginStore(path);
		this.stores.push(store);
		return store;
	}

	saveAllStores() {
		this.stores.forEach((store) => {
			store.save();
		});
	}
}

module.exports = GluePluginStoreFactory;
