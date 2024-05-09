// ApolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	                                uri: 'http://localhost:3001/graphql', // replace with your GraphQL server URI
                                });

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('auth_token'); // replace 'auth_token' with your token key
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	                                link: authLink.concat(httpLink),
	                                cache: new InMemoryCache(),
                                });

export default client;
