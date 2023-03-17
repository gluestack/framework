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
					[
						'Introduction',
						'Why gluestack?',
						// 'Why Mono Repo?',
					],
					'Architecture',
					[
						'Architecture',
						'The glue CLI',
						// 'Plugin & their Instances',
					],
					'Philosophy',
					'Prerequisites',
					'Installation',
					'Goals and non-goals',
					'FAQs',
				],
				'Getting started',
				[
					'Bootstrap Project',
					'Installing a Plugin as an Instance',
					'Adding Web',
					'Adding Backend',
					'Building REST APIs',
					'Building GraphQL APIs',
					// 'Adding UI Framework',
					// 'Adding Mobile',
					'Adding Deploy',
				],
				'Tutorials',
				[
					'Todo App',
					'Todo App with Auth',
					'Todo App with Auth & Mail',
					'Todo App with File Storage',
				]
			],
			locales: '',
		},
	},
};
