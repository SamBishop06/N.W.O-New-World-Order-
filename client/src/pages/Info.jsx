// User.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

// Load CSS
import '../assets/styles/info.scss';

export default () => {
	return (
		<main className="content whispers">
			<Helmet>
				<title>Info</title>
				<meta name="description" content="This is a place to put information, FAQs, etc."/>
			</Helmet>

		</main>
	);
}
