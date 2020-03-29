const File = require('../models').File;
const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

exports.upload = async (req, res) => {
  const file = req.file;
  if (file) {
    await File.create({
      name: file.originalname,
      extension: file.originalname.match(/.[^.]*$/)[0],
      MIMEtype: file.mimetype,
      path: file.path,
      size: parseInt(file.size),
    });
    res.sendStatus(201);
    return;
  }
  res.send('No file Error!');
};

exports.files = async (req, res) => {
  const limit = parseInt(req.query.list_size) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = limit * (page - 1);
  const files = await File.findAll({ limit, offset });
  res.json(files);
};

exports.delete = async (req, res) => {
  const pk = parseInt(req.params.id);
  if (!pk) {
    res.sendStatus(400);
  }
  const file = await File.findByPk(pk);
  if (!file) {
    res.sendStatus(400);
  }
  file.destroy();
  fs.unlink(file.path, (err) => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(204);
  });
  return;
};

exports.file = async (req, res) => {
  const pk = parseInt(req.params.id);
  if (!pk) {
    res.sendStatus(400);
  }
  const file = await File.findByPk(pk);
  if (file) {
    res.json(file);
    return;
  }
  res.sendStatus(404);
};

exports.downloadFile = async (req, res) => {
  const pk = parseInt(req.params.id);
  if (!pk) {
    res.sendStatus(400);
  }
  const file = await File.findByPk(pk);
  if (file) {
    res.sendFile(file.path, { root: appDir });
    return;
  }
  res.sendStatus(404);
};

exports.update = async (req, res) => {
  const pk = parseInt(req.params.id);
  const newFile = req.file;
  if (!pk || !newFile) {
    res.sendStatus(400);
  }
  const file = await File.findByPk(pk);
  if (!file) {
    res.sendStatus(404);
    return;
  }
  fs.unlink(file.path, async (err) => {
    if (err) {
      console.log(err);
    }
    file.name = newFile.originalname;
    file.extension = newFile.originalname.match(/.[^.]*$/)[0];
    file.MIMEtype = newFile.mimetype;
    file.path = newFile.path;
    file.size = parseInt(newFile.size);
    await file.save();
    res.json(file);
  });
};
