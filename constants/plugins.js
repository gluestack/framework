const PLUGINS = {
	/*
	framework: {
		package: '@gluestack/glue-plugin-framework',
		description: 'Installs a GlueStack Framework Plugin',
	},
	*/
	web: {
		package: '@gluestack/glue-plugin-web',
		description: 'Installs a Next.js App Plugin',
	},
	storybook: {
		package: '@gluestack/glue-plugin-storybook',
		description: 'Installs a Storybook App Plugin',
	},
	mobile: {
		package: '@gluestack/mobile',
		description: 'Installs a React Native App Plugin',
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
	functions: {
		package: '@gluestack/glue-plugin-functions',
		description: 'Installs a Function for computing',
	},
	'functions.action': {
		package: '@gluestack/glue-plugin-functions.action',
		description: 'Installs Hasura GraphQL Action Management on top of Functions Plugin',
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
	}
};

module.exports = { PLUGINS };
