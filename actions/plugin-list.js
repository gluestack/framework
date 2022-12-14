const { PLUGINS } = require('../constants/plugins');

module.exports = async () => {
	console.table(PLUGINS);
};
