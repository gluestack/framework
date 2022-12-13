const fs = require('fs');

const readFile = async (filePath) => {
	try {
		const raw = fs.readFileSync(filePath);
		return JSON.parse(raw);
	} catch (e) {
		return false;
	}
};

module.exports = { readFile };
