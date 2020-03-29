const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models').User;
const UserToken = require('../models').UserToken;

const users = [];
let refreshTokens = [];

exports.signup = async (req, res) => {
  try {
    if (
      !validator.isEmail(req.body.id) &&
      !validator.isMobilePhone(req.body.id)
    ) {
      res.status(400).send('Id must be email of phone number');
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { id: req.body.id, password: hashedPassword };
    User.create({ identifier: user.id, password: user.password });
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ where: { identifier: req.body.id } });
  if (!user) {
    res.status(400).send(`There is no user with id ${req.body.id}`);
    return;
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const bearerToken = generateBearertoken({
        id: user.identifier,
      });
      const refreshToken = jwt.sign(
        {
          id: user.identifier,
          password: user.password,
        },
        process.env.REFRESH_TOKEN_SECRET,
      );
      UserToken.create({ refreshToken, userId: user.id });
      refreshTokens.push(refreshToken);
      res.json({ bearerToken, refreshToken });
    } else {
      res.send('Not Allowed!');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.updateToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  if (!(await UserToken.findOne({ where: { refreshToken } }))) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const bearerToken = generateBearertoken({ id: user.id });
    res.json({ bearerToken });
  });
};

exports.info = (req, res) => {
  res.json(req.user.id);
};

exports.logout = async (req, res) => {
  token = await UserToken.findOne({
    where: { refreshToken: req.body.token },
  });
  if (token) {
    await token.destroy();
  }
  res.sendStatus(204);
};

const generateBearertoken = (user) => {
  return jwt.sign(user, process.env.BEARER_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION || '10m',
  });
};
