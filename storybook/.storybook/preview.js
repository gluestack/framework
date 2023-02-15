export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		// inlineStories: false,
	},
	options: {
		storySort: {
			method: '',
			order: [
				'Overview',
				[
					'Introduction',
					'Architecture',
					'Philosophy',
					'Prerequisites',
					'Installation',
					'Why gluestack?',
					'Goals and non-goals',
					'FAQs',
				],
				'Usage',
				[
					'Your first project',
					[
						'Bootstrap a project',
						'The glue CLI',
						'Install the web plugin',
						'Adding the database and GraphQL',
						'Consuming GraphQL',
					],
					'Testing gluestack',
				],
			],
			locales: '',
		},
	},
};
