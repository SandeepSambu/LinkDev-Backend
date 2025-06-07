const validator = require("validator");

const validation = (req) => {
  const { email, password } = req.body;
  if (!email && !password) {
    if (!validator.isEmail(email)) throw new Error("Invalid");
    else if (!validator.isStrongPassword(password))
      throw new Error("Password is not strong enough...");
  }
};

module.exports = validation;
