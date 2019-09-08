import React from 'react';
import { hydrate } from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';

import Config from './config';
import App from './components/App';

import 'tachyons/css/tachyons.min.css';
import './styles/index.css';
import './styles/style.scss';
import './styles/index.css';

// Apollo GraphQL client
const client = new ApolloClient({
  link: createHttpLink({
    uri: Config.gqlUrl,
  }),
  // eslint-disable-next-line no-underscore-dangle
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

hydrate(
  <HelmetProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App>
          <Helmet />
        </App>
      </BrowserRouter>
    </ApolloProvider>
  </HelmetProvider>,
  document.getElementById('root'),
);
