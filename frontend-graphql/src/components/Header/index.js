/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import {
  AppBar,
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import uuid from 'uuid-v4';

import logo from '../../static/images/MeridiAN.png';
const HEADER_MENU_ID = 'TWVudToy';

const MENU_QUERY = gql`
  query menuQuery {
    menu(id: "${HEADER_MENU_ID}") {
      menuItems {
        edges {
          node {
            cssClasses
            label
            url
            childItems {
              edges {
                node {
                  cssClasses
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  colorPrimary: {
    backgroundColor: '#fff',
    color: '#000',
  },
});

const gridStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const containerStyles = makeStyles({
  maxWidthSm: {
    maxWidth: '300px',
  }
});

// @todo: Need Skeleton Loader
const Header = ({ match }) => {
  const classes = useStyles();
  const gridClasses = gridStyles();
  const containerClasses = containerStyles();
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(MENU_QUERY);
  if (loading) return <p>loading. . .</p>;
  if (error) console.log('error', error);


  const { menu: {
    menuItems: {
      edges = []
    } = {}
  } = {} } = data;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    // <Grid className={gridClasses.root} container spacing={1} direction="row">
      <AppBar
        position="static"
        color="primary"
        classes={{
          colorPrimary: classes.colorPrimary
        }}
        className="mwd-header"
      >
        <Toolbar disableGutters>
          <Container maxWidth="sm" className={`${containerClasses.maxWidthSm}  wds-header__img-container`}>
            <img className="wds-header__img" src={logo} alt="Meridian Health Center Logo" />
          </Container>
        {/*<Grid item xs={9} direction="column">*/}
          {/*<Toolbar>*/}
            {/*<Grid container spacing={1}>*/}
              <List component="nav" className="mwd-header__menu">
                {edges.map(item => {
                  const { node: { cssClasses, childItems, label, url } } = item;
                  const { edges: subMenu = [] } = childItems;
                  const isInternal = url.indexOf('meridiandocs');

                  const linkItem = isInternal > -1
                    ? <Link to={url} >{label}</Link>
                    : <a href={url} target="__blank">{label}</a>;

                  return (
                    <>
                      <ListItem
                        className={cssClasses.join(' ')}
                        // component="a"
                        // href={url}
                        button
                        key={uuid()}
                        onClick={subMenu.length ? handleClick : null}
                      >
                        <ListItemText primary={label} />
                        {subMenu.length && open
                          ? <ExpandLess />
                          : null
                        }
                        { subMenu.length && !open
                          ? <ExpandMore />
                          : null
                        }
                      </ListItem>
                      <Collapse key={uuid()} in={open} unmountOnExit>
                        <List component="div">
                          {subMenu.map(({ node }) => {
                            return (
                              <ListItem key={uuid()} button component="a" href={node.url}>
                                <ListItemText inset primary={node.label} />
                              </ListItem>
                            )
                          })}
                        </List>
                      </Collapse>
                    </>
                  )
                })}
              </List>
            {/*</Grid>*/}
          {/*</Toolbar>*/}
        </Toolbar>
      </AppBar>
    // </Grid>
  )
};

export default compose(
  withRouter,
)(Header);

Header.propTypes = {
  match: PropTypes.shape({}).isRequired,
};