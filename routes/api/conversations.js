const router = require("express").Router();
const ctrl = require("../../controllers/conversations");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

//new conversation
router.post("/", authenticate, ctrlWrapper(ctrl.addConversation));

//get conversations of a user
router.get("/:userId", authenticate, ctrlWrapper(ctrl.getConversationsByUser));

// get conversation includes two userId
router.get(
  "/find/:firstUserId/:secondUserId",
  authenticate,
  ctrlWrapper(ctrl.getConversationByTwoUser)
);

module.exports = router;
