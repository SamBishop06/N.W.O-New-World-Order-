import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import client from './config/ApolloClient';
import User from './components/User-Login';


// Import Components.
import { PageFooter, PageHeader } from './components';
import { Home,  Whispers } from './pages';

// Load CSS.
import './assets/styles/main.scss';

function App() {
	const [count, setCount] = useState(0);

	return (
		<ApolloProvider client={client}>
			<Router>
				<Helmet defaultTitle="Home"
					titleTemplate="%s | N.W.O"/>
				<PageHeader/>

				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/user/*" element={<User/>}/>
					<Route path="/whispers/*" element={<Whispers/>}/>
				</Routes>

				<PageFooter/>
			</Router>
		</ApolloProvider>
	);
}

export default App;
