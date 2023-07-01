const models = require('../models/index');
const userModel = models.User;
const jwt = require('jsonwebtoken');
const responseData = require('../helper/response');

const verifyToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
      req.user = await userModel.findOne({
        _id: decoded._id
      });
      next();
    } else {
      return responseData.errorResponse(res, 'Authorization failed');
    }
    if (!token) {
      return responseData.errorResponse(res, 'Token not found');
    }
  } catch (error) {
    responseData.errorResponse(res, error);
  }
};

module.exports = {verifyToken};
