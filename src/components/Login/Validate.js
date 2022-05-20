const validator = require("validator");

const validateSignUpForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;
console.log(payload.username.trim().length);
  if (!payload ||typeof payload.username !== "string" ||payload.username.trim().length === 0)
   {
    console.log('Inside????');
    isFormValid = false;
    errors.username = "Please provide a user name.";
   }
   console.log(!validator.isEmail(payload.email));
  if (!payload ||typeof payload.email !== "string" ||!validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (!payload ||typeof payload.password !== "string" ||payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  if (!payload || payload.pwconfrim !== payload.password) {
    isFormValid = false;
    errors.pwconfrim = "Password confirmation doesn't match.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};


module.exports = {
  validateSignUpForm: validateSignUpForm
};
