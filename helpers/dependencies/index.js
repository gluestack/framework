const { docker } = require('./docker');
const { dockerCompose } = require('./docker-compose');
const { dockerStatus } = require('./docker-status');
const { hasura } = require('./hasura');
const { node } = require('./node');
const { yarn } = require('./yarn');

const dependencies = {
	docker: 'docker',
	dockerCompose: 'dockerCompose',
	dockerStatus: 'dockerStatus',
	hasura: 'hasura',
	node: 'node',
	yarn: 'yarn',
};

module.exports = {
	docker,
	dockerCompose,
	dockerStatus,
	hasura,
	node,
	yarn,
	dependencies,
};
