const fs = require('fs');
const $path = require('path');
const os = require('os');

class GluePluginStore {
	path;
	store;

	constructor(path) {
		this.path = path;
		this.store = {};
	}

	restore() {
		try {
			if (fs.existsSync($path.dirname(this.path))) {
				const data = fs.readFileSync(this.path, 'utf8');
				if (data) {
					this.store = JSON.parse(data);
				}
			}
		} catch (error) {
			//
		}
	}

	set(key, value) {
		this.store[key] = value;
	}

	get(key) {
		return this.store[key];
	}

	save() {
		try {
			if (!fs.existsSync($path.dirname(this.path))) {
				fs.mkdirSync($path.dirname(this.path), { recursive: true });
			}
			fs.writeFileSync(
				this.path,
				JSON.stringify(this.store, null, 2) + os.EOL
			);
		} catch (error) {
			//
		}
	}
}

module.exports = GluePluginStore;
