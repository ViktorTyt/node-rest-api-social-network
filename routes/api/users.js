const router = require("express").Router();

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

// update user
// router.put("/:id", authenticate, ctrlWrapper(ctrl.updateUser));

// // delete user
// router.delete("/:id", authenticate, ctrlWrapper(ctrl.deleteUser));

// get user my version
router.get("/:id", ctrlWrapper(ctrl.getUser));

//  get friends
router.get("/friends/:userId", authenticate, ctrlWrapper(ctrl.getFriends));

// follow a user
router.put("/:id/follow", authenticate, ctrlWrapper(ctrl.followUser));

// unfollow a user
router.put("/:id/unfollow", authenticate, ctrlWrapper(ctrl.unfollowUser));

module.exports = router;
