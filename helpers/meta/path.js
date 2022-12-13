const path = require('path');
const { fileExists } = require('../file');
const { getVar } = require('../variables');
const { migrationDir } = require('../../constants/meta.json');
const { error } = require('../print');

const migrationPath = async () => {
	const projectPath = getVar('projectPath');
	const _path = path.join(projectPath, migrationDir);

	if (!fileExists(_path)) {
		error(
			'Error',
			'Hasura metadata directory not found or incorrect structure.'
		);
		process.exit(1);
	}

	return _path;
};

module.exports = {
	migrationPath,
};
