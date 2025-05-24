const LoginHandler = require("./LoginHandler");
const SignUpHandler = require("./SignUpHandler");
const IdentityVerificationHandler = require("./IdentityVerificationHandler");
const ValidateJWTHandler = require("./ValidateJWTHandler");
module.exports = {
  loginHandler: new LoginHandler(),
  signUpHandler: new SignUpHandler(),
  identityVerificationHandler: new IdentityVerificationHandler(),
  validateJWTHandler: new ValidateJWTHandler(),
};
