const express = require("express");
const router = express.Router();

const authController = require("./authController");

console.log("authController import:", authController);

const { signup, login } = authController;

console.log("signup is function?", typeof signup === "function");
console.log("login is function?", typeof login === "function");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
