import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
// import { UserProvider } from './utils/userContext.jsx'; // Import the UserProvider
// import { ActivityProvider } from './utils/ActivityContext'; // Import the ActivityProvider
import ErrorBoundary from './pages/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          {/* <UserProvider> 
        <ActivityProvider> */}
          {/* Wrap your entire app with ErrorBoundary */}
          <ErrorBoundary>
              <Header />
                <Outlet />
                <div className='footer'>
                <Footer />
                </div>
          </ErrorBoundary>
          
          {/* </ActivityProvider>
      </UserProvider> */}
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;