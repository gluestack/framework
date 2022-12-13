const { error } = require('../print');
const { getVar } = require('../variables');
const { readFile, writeFile } = require('../file');

const service = async (
	servicePath,
	serviceName,
	serviceType,
	directoryName = ''
) => {
	const projectPath = process.cwd();

	let data = await readFile(`${projectPath}/${servicePath}`);
	if (!data) {
		error('Meta plugins file is corrupted.');
		process.exit(0);
	}
	data.push({
		name: serviceName,
		directory: directoryName || serviceName,
		type: serviceType,
	});
	// write services in file
	await writeFile(
		`${projectPath}/${servicePath}`,
		JSON.stringify(data, null, 2)
	);
};

module.exports = { service };
