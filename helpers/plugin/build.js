const { exec } = require('child_process');
const { fileExists, copyFile, createFolder } = require('../file');
const { error, info } = require('../print');

const tsStubFiles = [
	{
		source:
			'node_modules/@gluestack/framework/types/plugin/stubs/tsconfig.json.txt',
		target: 'tsconfig.json',
	},
];

async function copyTsFiles(currentDir) {
	for (const stubFile of tsStubFiles) {
		if (stubFile.dir) {
			if (!(await fileExists(stubFile.dir))) {
				await createFolder(stubFile.dir);
			}
		}
		await copyFile(
			`${currentDir}/${stubFile.source}`,
			`${currentDir}/${stubFile.target}`
		);
	}
}

async function runner() {
	const steps = ['tsc'];
	for (const step of steps) {
		await new Promise((resolve, reject) => {
			exec(step, async (err, stdout, stderr) => {
				resolve(true);
			});
		});
	}
}

module.exports = async (currentDir) => {
	await copyTsFiles(currentDir);
	await runner();
};
