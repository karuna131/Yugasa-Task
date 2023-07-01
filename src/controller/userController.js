const models = require('../models/index');
const userModel = models.User;
const responseData = require('../helper/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  signUp : async (req, res) => {
    try {
      const isExist = await userModel.findOne({user_name: req.body.user_name});
      if (isExist) {
        responseData.errorResponse(res, 'UserName already exists');
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const info = {
          user_name: req.body.user_name,
          password: hashPassword,
        };
        const createUser = await userModel.create(info);
        responseData.sendResponse(res, 'User created successfully', createUser);
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  login: async (req, res) => {
    try {
      const userData = await userModel.findOne({user_name: req.body.user_name});
      if (userData) {
        const checkingPassword = bcrypt.compareSync(req.body.password, userData.password);
        if (checkingPassword) {
          const authToken = jwt.sign({_id: userData._id}, process.env.USER_SECRET_KEY);
          const updateUserData = await userModel.findOneAndUpdate({_id: userData._id}, {token: authToken}, {new: true});
          responseData.sendResponse(res, 'User login successfully', updateUserData);
        } else {
          responseData.errorResponse(res, 'Please check your password again!');
        }
      } else {
        responseData.errorResponse(res, 'Please check your user name again!');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  updaterole: async (req, res) => {
    try {
      const userData = await userModel.findOneAndUpdate({_id: req.params.id}, {role: req.body.role}, {new: true});
      if (userData) {
        responseData.sendResponse(res, 'Role updated successfully', userData);
      } else {
        responseData.errorResponse(res, 'Id not found');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  dashboardApi : async (req, res) => {
    try {
      const isExist = await userModel.findOne({_id: req.user._id});
      if(isExist){
        responseData.sendResponse(res, `Wellcome ${isExist.user_name}`);
      }else{
        responseData.errorResponse(res, 'Data not found');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  adminDetail : async (req, res) => {
    try {
      const isAdmin = await userModel.findOne({_id: req.user._id, role: 'admin'});
      if(isAdmin){
        responseData.sendResponse(res, 'This user is admin.');
      }else{
        responseData.errorResponse(res, 'This user does not have admin role');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },
}

module.exports = userController;
