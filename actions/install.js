const { isEmpty } = require('lodash');
const https = require('https');
const { setVar } = require('../helpers/variables');
const { fileExists, rm } = require('../helpers/file');
const download = require('../helpers/download');
const { service: metaService } = require('../helpers/meta/service');
const metaExists = require('../helpers/meta/exists');
const { success, error, newline } = require('../helpers/print');
const { writePlugin } = require('../helpers/meta/plugins');

async function validateAndGet(serviceName, directoryName) {
	/*
	try {
		await checkForPackage(serviceName);
	} catch (e) {
		error(`"${serviceName}" is not supported`);
		process.exit(0);
	}
	*/

	// adding the installed services
	const serviceFilePath = 'meta/services.json';
	const pluginFilePath = 'meta/plugins.json';

	if (!fileExists(serviceFilePath)) {
		error(
			"Meta files missing. Please goto project's root directory."
		);
		process.exit(0);
	}

	const folderName = directoryName;

	// check if service exists
	await metaExists(serviceFilePath, serviceName, folderName);

	return { serviceFilePath, pluginFilePath, folderName };
}

function checkForPackage(serviceName) {
	return new Promise((resolve, reject) => {
		https
			.get(
				`https://registry.npmjs.org/@gluestack/${serviceName}`,
				(res) => {
					if (res.statusCode === 200) {
						let body = '';
						res.on('data', (data) => (body += data));
						res.on('end', () => {
							resolve(JSON.parse(body).latest);
						});
					} else {
						reject();
					}
				}
			)
			.on('error', (e) => {
				reject(e);
			});
	});
}

module.exports = async (serviceName, directoryName) => {
	setVar('serviceName', serviceName);

	const { serviceFilePath, pluginFilePath, folderName } =
		await validateAndGet(serviceName, directoryName);

	const folderPath = `./${folderName}`;

	// download service project
	await download(
		serviceName,
		`@gluestack/${serviceName}`,
		folderPath,
		folderName
	);

	// updates meta/services.json file
	await metaService(serviceFilePath, serviceName, 'app', folderName);
	await writePlugin(
		pluginFilePath,
		serviceName,
		'app',
		`node_modules/@gluestack/${serviceName}`,
		folderName
	);

	success('Successfully installed service', folderName);
	newline();
};
