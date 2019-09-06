const validator = require("validator");

module.exports = function validateRegister(payload) {
  const errors = {};
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 6
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 6 characters.";
  }

  if (
    !payload ||
    typeof payload.fullName !== "string" ||
    payload.fullName.trim().length === 0
  ) {
    isFormValid = false;
    errors.fullName = "Please provide your name.";
  }

  return {
    success: isFormValid,
    errors
  };
};
