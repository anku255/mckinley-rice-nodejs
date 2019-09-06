const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("users");

exports.handleRegister = async (req, res) => {
  // TODO:
  // Validate Input

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        type: "validation",
        errors: { email: "Email already in use" }
      });
    }

    const user = await new User(req.body).save();

    return res.json({
      message: "Registration Successful!"
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: JSON.stringify(err) });
  }
};

exports.handleLogin = async (req, res) => {
  // TODO:
  // Validate Input

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    user.comparePassword(password, (err, isMatch) => {
      if (isMatch) {
        const { password: pass, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign(userWithoutPassword, process.env.SECRET_KEY, {
          expiresIn: 60 * 60 * 24 * 30 // 30 days
        });
        return res.json({
          ...userWithoutPassword,
          token: `Bearer ${token}`
        });
      }
      return res.status(400).json({
        type: "validation",
        errors: { password: "Incorrect Password!" }
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ type: "miscellaneous", message: JSON.stringify(error) });
  }
};
