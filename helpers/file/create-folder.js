const { promises } = require('fs');

const createFolder = async (_folder) => {
	// await promises.rm(_folder, { recursive: true, force: true });
	await promises.mkdir(_folder, { recursive: true, force: true });

	return Promise.resolve(true);
};

module.exports = { createFolder };
