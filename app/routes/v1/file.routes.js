const auth = require('../../middleware/authenticate');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
  const file = require('../../controllers/file.controller.js');

  const router = require('express').Router();

  router.post('/upload', upload.single('file'), file.upload);
  // router.get('/list', file.files);
  // router.delete('/delete/:id', file.delete);
  // router.get('/:id', file.file);
  // router.get('/download/:id', file.downloadFile);
  // router.put('/update/update/:id');

  app.use('/api/v1/file', router);
};
