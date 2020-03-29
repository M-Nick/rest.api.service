const files = [];

exports.upload = (req, res) => {
  if (req.file) {
    files.push(req);
    res.json(req.file);
    return;
  }
  res.send('No file Error!');
};
