const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ status: `Server running at PORT ${process.env.PORT || 5000}` });
});

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);

module.exports = router;
