const express = require('express');
const router = express.Router();
const {
    registerFunction,
    resetRegistration,
    verifyOTP,
    loginFunction,
    getCurrentAuth,
    logoutFunction,
} = require('../controllers/authControllers');
const authentication = require('../middleware/authentication');

router.post("/register", registerFunction);
router.post("/reset", resetRegistration);
router.post("/verify/:otp", verifyOTP);
router.post("/login", loginFunction);
router.get("/me", authentication, getCurrentAuth);
router.post("/logout", logoutFunction);

module.exports = router;