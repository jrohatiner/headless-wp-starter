// import React from 'react';
import Hero from './Hero';

const Index = name => {
  const blocks = {
    'coblocks/hero': Hero,
    // 'kenzap-team-members/block-01': <div>Hello!!</div>,
  };
  return blocks[name] || null;
};

export default Index;