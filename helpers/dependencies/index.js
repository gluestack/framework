const { docker } = require('./docker');
const { dockerCompose } = require('./docker-compose');
const { dockerStatus } = require('./docker-status');
const { hasura } = require('./hasura');
const { node } = require('./node');
const { yarn } = require('./yarn');
const { npm } = require('./npm');
const { tsc } = require('./tsc');

const dependencies = {
	docker: 'docker',
	dockerCompose: 'dockerCompose',
	dockerStatus: 'dockerStatus',
	hasura: 'hasura',
	node: 'node',
	yarn: 'yarn',
	npm: 'npm',
};

module.exports = {
	docker,
	dockerCompose,
	dockerStatus,
	hasura,
	node,
	yarn,
	tsc,
	npm,
	dependencies,
};
