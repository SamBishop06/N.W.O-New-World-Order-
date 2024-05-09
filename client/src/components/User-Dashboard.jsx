import { Helmet } from 'react-helmet';
// Load CSS
import '../assets/styles/dashboard.scss';

export default () => (
	<main className="content dashboard">
		<Helmet>
			<title>Dashboard</title>
			<meta name="description" content="This is the dashboard page, once a user has been logged in"/>
		</Helmet>
	</main>
);
