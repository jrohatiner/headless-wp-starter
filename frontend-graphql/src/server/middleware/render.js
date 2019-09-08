import React from 'react';
import { renderToString } from 'react-dom/server';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { getDataFromTree } from "@apollo/react-ssr";

import Config from '../../config';

// import our main App component
import view from '../views';
import App from '../../components/App';

export default (req, res, next) => {

  try {
    // Apollo GraphQL client
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: Config.gqlUrl,
        fetch
      }),
      headers: {
        cookie: req.header('Cookie'),
      },
      // eslint-disable-next-line no-underscore-dangle
      cache: new InMemoryCache(),
    });

    const helmetContext = {};
    const routerContext = {};
    // render the app as a string
    const html = (
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={client}>
          <StaticRouter location={req.originalUrl} context={routerContext}>
            <App/>
          </StaticRouter>
        </ApolloProvider>
      </HelmetProvider>
    );

    getDataFromTree(html).then(() => {
      const content = renderToString(html);
      const initialState = client.extract();
      // inject the rendered app into our html and send it
      res
        .status(200)
        .send(view({
          html: content,
          state: initialState,
          helmet: helmetContext
        }))
        .end();
    });
  } catch (e) {
    console.log('error', e);
    res.status(500).send('Error', e);
  }
}