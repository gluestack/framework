const PLUGINS = {
	web: {
		package: '@gluestack/web',
		description: 'Installs a Next.js App Plugin',
	},
	mobile: {
		package: '@gluestack/mobile',
		description: 'Installs a React Native App Plugin',
	},
	storybook: {
		package: '@gluestack/storybook',
		description: 'Installs a Storybook App Plugin',
	},
	functions: {
		package: '@gluestack/functions',
		description: 'Installs a Function for computing',
	},
	graphql: {
		package: '@gluestack/graphql',
		description: 'Installs a Hasura GraphQL App Plugin',
	},
	auth: {
		package: '@gluestack/auth',
		description: 'Installs auth in your App',
	},
	storage: {
		package: '@gluestack/storage',
		description: 'Installs storage in your App',
	},
	cron: {
		package: '@gluestack/cron',
		description: 'Installs Cron in your App',
	},
	jobs: {
		package: '@gluestack/jobs',
		description: 'Installs Jobs in your App',
	},
};

module.exports = { PLUGINS };
