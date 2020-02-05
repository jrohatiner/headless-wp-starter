import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Blocks from '../Blocks/index';

const PAGE_QUERY = gql`
  query pageQuery($id: ID!) {
    page(id: $id, idType: URI) {
      slug
      date
      uri
      link
      isFrontPage
      title(format: RENDERED)
      blocksJSON
      featuredImage {
        altText
        databaseId
        desiredSlug
        mediaItemUrl
        sizes
        mediaDetails {
          width
          height
          sizes {
            sourceUrl
            height
            width
            file
            name
          }
        }
      }
    }
  }
`;

const Page = ({ match }) => {
  let { slug } = match.params;
  if (!slug) {
    slug = 'home';
  }
  const { loading, error, data } = useQuery(PAGE_QUERY, {
    variables: { id: slug }
  });

  if (loading) return <div>Loading . . .</div>;
  if (error) console.log('e', error);
  const { page = {} } = data;
  // @todo: get title for helmet
  const { title = '', blocksJSON = '' } = page;
  const blocks = JSON.parse(blocksJSON) || [];
  console.log('blocks', blocks);
  return (
    <div>
      {blocks && (
        blocks.map(block => {
          const { name = '' } = block;
          const Component = Blocks(name);
          if (!Component) return null;
          return <Component key={name} {...block} /> //eslint-disable-line
        })
      )}
    </div>
  );
};

export default Page;

Page.propTypes = {
  match: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired,
};

