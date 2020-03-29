const auth = require('../../middleware/authenticate');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
  const file = require('../../controllers/file.controller.js');

  const router = require('express').Router();

  router.post(
    '/upload',
    auth.authenticateToken,
    upload.single('file'),
    file.upload,
  );
  router.get('/list', auth.authenticateToken, file.files);
  router.delete('/delete/:id', auth.authenticateToken, file.delete);
  router.get('/:id', auth.authenticateToken, file.file);
  router.get('/download/:id', auth.authenticateToken, file.downloadFile);
  router.put(
    '/update/:id',
    auth.authenticateToken,
    upload.single('file'),
    file.update,
  );

  app.use('/api/v1/file', router);
};
