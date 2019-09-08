import express from 'express';

import render from '../middleware/render';

const route = express.Router({
  caseSensitive: true
});

// @todo: meed to port these over
// Handles extra server calls
// route.post('/payment', [payment]);
// route.post('/register', [registration]);

// Main routes
route.get('/radio', (req, res) => {
  res.redirect(302, '/?source=radio');
});
route.get('/*', [render]);

export default route;