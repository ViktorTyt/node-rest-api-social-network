const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// register a new user
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerify)
);

// login
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// get current user
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// logout
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateStatusSchema),
  ctrlWrapper(ctrl.updateUserSubcription)
);

module.exports = router;
