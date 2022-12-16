import Head from 'next/head';
import React, { useState } from 'react';
import '../styles/globals.css';
// @ts-ignore
import Layout from '@gluestack/docs-layout';
// import Layout from "../layout";
import { versions } from '../versions.json';

function MyApp({ Component, pageProps }: any) {
	const [version, setVersion]: any = useState(
		Object.keys(versions[versions.length - 1])
	);

	function getSidebarJsonData() {
		for (let i = 0; i < versions.length; i++) {
			if (Object.keys(versions[i])[0] == version) {
				return versions[i];
			}
		}
	}
	// console.log("Loaded", version);
	return (
		<Layout
			version={version}
			versionInfo={getSidebarJsonData()}
			setVersion={setVersion}
			versionsData={versions}
		>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
