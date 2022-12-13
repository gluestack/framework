const fs = require('fs');

const rm = (filePath) => {
	fs.rmSync(filePath, { recursive: true, force: true })
		? true
		: false;
};

module.exports = { rm };
