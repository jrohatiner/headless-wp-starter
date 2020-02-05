import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  posts {
    edges {
      node {
        title
        slug
      }
    }
  }
`;

const Blog = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return <div>loading. . .</div>;
  if (error) console.log('e', error);
  return <div>Blog content list here!</div>
};

export default Blog;

Blog.propTypes = {};