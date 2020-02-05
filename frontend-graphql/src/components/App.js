import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header/index';
import Footer from './Footer';
// import Home from './Home/index';
import Page from './Page'
import Post from './Post';
// import Blog from './Blog';

export default () => (
  <div className="center">
    <Header />
    <div className="">
      <Switch>
        <Route exact path="/" component={Page} />
        <Route exact path="/:slug" component={Page} />
        {/* @todo: Not ready yet */}
        {/* <Route exact path="/blog/" component={Blog} /> */}
        <Route exact path="/blog/:slug" component={Post} />
      </Switch>
    </div>
    <Footer />
  </div>
);
