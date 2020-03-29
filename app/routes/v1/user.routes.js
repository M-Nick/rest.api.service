module.exports = (app) => {
  const auth = require('../../middleware/authenticate');
  const user = require('../../controllers/user.controller.js');

  const router = require('express').Router();

  router.get('/info', auth.authenticateToken, user.info);

  router.post('/signup', user.signup);
  router.post('/signin', user.signin);
  router.post('/signin/new_token', user.updateToken);
  router.get('/logout', auth.authenticateToken, user.logout);

  app.use('/api/v1', router);
};
