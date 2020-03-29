const auth = require('../../middleware/authenticate');

module.exports = (app) => {
  const user = require('../../controllers/user.controller.js');

  const router = require('express').Router();

  router.get('/users', auth.authenticateToken, user.all);
  router.get('/info', auth.authenticateToken, user.info);

  router.post('/signup', user.signup);
  router.post('/signin', user.signin);
  router.post('/signin/new_token', user.updateToken);
  router.get('/logout', user.logout);

  app.use('/api/v1', router);
};
