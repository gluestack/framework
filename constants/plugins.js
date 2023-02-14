const PLUGINS = {
	web: {
		package: '@gluestack/glue-plugin-web',
		description: 'Installs a Next.js App Plugin',
	},
	storybook: {
		package: '@gluestack/glue-plugin-storybook',
		description: 'Installs a Storybook App Plugin',
	},
	engine: {
		package: '@gluestack/glue-plugin-engine',
		description: 'Installs a GlueStack Process Manager Engine Plugin',
	},
	postgres: {
		package: '@gluestack/glue-plugin-postgres',
		description: 'Installs a Postgres Database Plugin',
	},
	'pg-admin': {
		package: '@gluestack/glue-plugin-pg-admin',
		description: 'Installs a PG Admin Database Plugin',
	},
	graphql: {
		package: '@gluestack/glue-plugin-graphql',
		description: 'Installs a Hasura GraphQL App Plugin',
	},
	'service-node': {
		package: '@gluestack/glue-plugin-service-node',
		description: 'Installs a Node micro-service',
	},
	'service-nodemailer': {
		package: '@gluestack/glue-plugin-service-nodemailer',
		description: 'Installs a Nodemailer micro-service',
	},
	'backend-engine': {
		package: '@gluestack/glue-plugin-backend-engine',
		description: 'Installs a Backend GlueStack Engine App Plugin with CRONs & Queues'
	},
	auth: {
		package: '@gluestack/glue-plugin-auth',
		description: 'Installs auth in your App',
	},
	minio: {
		package: '@gluestack/glue-plugin-minio',
		description: 'Installs a Minio Storage Plugin',
	},
	storage: {
		package: '@gluestack/glue-plugin-storage',
		description: 'Installs storage in your App',
	},
	sdk: {
		package: '@gluestack/glue-plugin-sdk',
		description: 'Installs a GlueStack SDK Plugin',
	},
	deploy: {
		package: '@gluestack/glue-plugin-deploy',
		description: 'Installs a GlueStack Deploy Plugin',
	}
};

module.exports = { PLUGINS };
