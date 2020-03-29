// const auth = require('../../middleware/authenticate');

// module.exports = (app) => {
//   const file = require('../../controllers/file.controller.js');

//   const router = require('express').Router();

//   router.get('/', auth.authenticateToken, file.all);

//   router.post('/signup', auth.authenticateToken, file.signup);
//   router.post('/signin', auth.authenticateToken, file.signin);

//   router.post('/info');

//   app.use('/api/v1/file', router);
// };
