const AuthHandler = require("../patterns/templateMethod/authHandler/index");

module.exports.signUp = async (req, res) => {
  AuthHandler.signUpHandler.handle(req, res);
};

module.exports.logIn = async (req, res) => {
  AuthHandler.loginHandler.handle(req, res);
};

module.exports.identityVerification = async (req, res) => {
  AuthHandler.identityVerificationHandler.handle(req, res);
};

module.exports.validateJWT = async (req, res) => {
  AuthHandler.validateJWTHandler.handle(req, res);
};
