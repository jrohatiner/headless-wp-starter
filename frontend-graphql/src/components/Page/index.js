import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PageQuery = gql`
    query PageQuery($uri: String!) {
        pageBy(uri: $uri) {
            title
            blocks {
                originalContent
                name
                innerBlocks {
                    originalContent
                }
            }
        }
    }
`;

const Page = ({ match }) => {
  let { slug } = match.params;
  if (!slug) {
    slug = 'welcome';
  }

  return (
    <Query query={PageQuery} variables={{ uri: slug }} ssr>
      {({ error, data }) => {
        if (error) console.log('e', error);
        console.log('d', data);
        const { pageBy = {} } = data;
        const { title = '', blocks = [] } = pageBy;
        return (
          <div>
            <h1>{ title }</h1>
            Content Rendered Here!
          </div>
        );
      }}
    </Query>
  )
};

export default Page;